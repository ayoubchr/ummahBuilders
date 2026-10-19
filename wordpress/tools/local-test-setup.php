<?php
// Setup for the local Docker WordPress in wordpress/local (templates mounted at /templates).
// Run: docker compose run --rm cli eval-file /tools/local-test-setup.php
// Safe to run again: existing pages are updated, not duplicated. Not part of the theme.

update_option( 'elementor_disable_color_schemes', 'yes' );
update_option( 'elementor_disable_typography_schemes', 'yes' );

// One page per language: the informative one-pager.
$languages = array(
	'nl' => array( 'name' => 'Nederlands', 'locale' => 'nl_NL', 'rtl' => 0, 'flag' => 'be', 'title' => 'Home', 'slug' => 'home' ),
	'en' => array( 'name' => 'English', 'locale' => 'en_GB', 'rtl' => 0, 'flag' => 'gb', 'title' => 'Home', 'slug' => 'home-en' ),
	'fr' => array( 'name' => 'Français', 'locale' => 'fr_FR', 'rtl' => 0, 'flag' => 'fr', 'title' => 'Accueil', 'slug' => 'accueil' ),
	'ar' => array( 'name' => 'العربية', 'locale' => 'ar', 'rtl' => 1, 'flag' => 'arab', 'title' => 'الرئيسية', 'slug' => 'home-ar' ),
);

// Menu labels per language; links are anchors on the one-pager.
$menu_items = array(
	'nl' => array( '#visie' => 'Visie', '#manifest' => 'Manifest', '#roadmap' => 'Roadmap' ),
	'en' => array( '#visie' => 'Vision', '#manifest' => 'Manifesto', '#roadmap' => 'Roadmap' ),
	'fr' => array( '#visie' => 'Vision', '#manifest' => 'Manifeste', '#roadmap' => 'Feuille de route' ),
	'ar' => array( '#visie' => 'الرؤية', '#manifest' => 'البيان', '#roadmap' => 'خارطة الطريق' ),
);

// Remove pages from the earlier multi-page version.
foreach ( array( 'manifest', 'manifesto', 'roadmap', 'our-roadmap', 'sample-page' ) as $old_slug ) {
	$old = get_page_by_path( $old_slug );
	if ( $old ) {
		wp_delete_post( $old->ID, true );
	}
}
$hello = get_page_by_path( 'hello-world', OBJECT, 'post' );
if ( $hello ) {
	wp_delete_post( $hello->ID, true );
}

$ids = array();
foreach ( $languages as $lang => $info ) {
	$tpl      = json_decode( file_get_contents( "/templates/onepager-$lang.json" ), true );
	$existing = get_page_by_path( $info['slug'] );
	$id       = $existing ? $existing->ID : wp_insert_post(
		array(
			'post_type'   => 'page',
			'post_status' => 'publish',
			'post_title'  => $info['title'],
			'post_name'   => $info['slug'],
		)
	);
	wp_update_post( array( 'ID' => $id, 'post_title' => $info['title'] ) );
	update_post_meta( $id, '_elementor_edit_mode', 'builder' );
	update_post_meta( $id, '_elementor_template_type', 'wp-page' );
	update_post_meta( $id, '_wp_page_template', 'elementor_header_footer' );
	update_post_meta( $id, '_elementor_data', wp_slash( wp_json_encode( $tpl['content'] ) ) );
	update_post_meta( $id, '_elementor_page_settings', $tpl['page_settings'] );
	$ids[ $lang ] = $id;
	echo "onepager-$lang => $id\n";
}
update_option( 'show_on_front', 'page' );
update_option( 'page_on_front', $ids['nl'] );

if ( function_exists( 'PLL' ) ) {
	$model = PLL()->model;
	$order = 0;
	foreach ( $languages as $lang => $info ) {
		if ( ! $model->get_language( $lang ) ) {
			$model->add_language(
				array(
					'name'       => $info['name'],
					'slug'       => $lang,
					'locale'     => $info['locale'],
					'rtl'        => $info['rtl'],
					'term_group' => $order,
					'flag'       => $info['flag'],
				)
			);
		}
		++$order;
	}

	// Polylang keeps its own options object; writing the WP option directly gets overwritten.
	$options                  = PLL()->options;
	$options['default_lang']  = 'nl';
	$options['hide_default']  = true;
	$options['force_lang']    = 1;
	$options['rewrite']       = true;
	$options['redirect_lang'] = true; // Front pages at /en/, /fr/, /ar/ instead of /en/<page-name>/.
	$options->save();

	foreach ( $ids as $lang => $id ) {
		pll_set_post_language( $id, $lang );
	}
	pll_save_post_translations( $ids );

	// One header menu per language.
	$menus = array();
	foreach ( $menu_items as $lang => $items ) {
		$label = "Hoofdmenu $lang";
		$obj   = wp_get_nav_menu_object( $label );
		if ( $obj ) {
			wp_delete_nav_menu( $obj->term_id );
		}
		$menus[ $lang ] = wp_create_nav_menu( $label );
		foreach ( $items as $url => $title ) {
			wp_update_nav_menu_item(
				$menus[ $lang ],
				0,
				array(
					'menu-item-title'  => $title,
					'menu-item-url'    => $url,
					'menu-item-type'   => 'custom',
					'menu-item-status' => 'publish',
				)
			);
		}
	}
	$nav_menus                                   = $options['nav_menus'];
	$nav_menus[ get_stylesheet() ]['ub-primary'] = $menus;
	$options['nav_menus']                        = $nav_menus;
	$options->save();
	set_theme_mod( 'nav_menu_locations', array( 'ub-primary' => $menus['nl'] ) );
	$model->clean_languages_cache();
	flush_rewrite_rules();
}

// Simply Static: export pages + the assets they use to wordpress/local/export with relative URLs.
if ( defined( 'SIMPLY_STATIC_VERSION' ) ) {
	$ss                                  = get_option( 'simply-static', array() );
	$ss['delivery_method']               = 'local';
	$ss['local_dir']                     = '/var/www/export/';
	$ss['destination_url_type']          = 'relative';
	$ss['relative_path']                 = '/';
	$ss['clear_directory_before_export'] = true;
	// Only what the pages need; the default crawlers copy every plugin file (~140 MB).
	$ss['crawlers']   = array( 'home', 'post_type', 'theme_assets', 'uploads', 'elementor' );
	$ss['post_types'] = array( 'page' );
	update_option( 'simply-static', $ss );
}

\Elementor\Plugin::$instance->files_manager->clear_cache();
