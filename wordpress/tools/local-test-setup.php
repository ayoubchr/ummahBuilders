<?php
// Setup for the local Docker WordPress in wordpress/local (templates mounted at /templates).
// Run: docker compose run --rm cli eval-file /tools/local-test-setup.php
// Safe to run again: existing pages are updated, not duplicated. Not part of the theme.
update_option( 'elementor_disable_color_schemes', 'yes' );
update_option( 'elementor_disable_typography_schemes', 'yes' );

$pages = array(
	array( 'home-nl', 'Home', 'home' ),
	array( 'manifest-nl', 'Manifest', 'manifest' ),
	array( 'roadmap-nl', 'Roadmap', 'roadmap' ),
	array( 'home-en', 'Home', 'home-en' ),
	array( 'manifest-en', 'Manifesto', 'manifesto' ),
	array( 'roadmap-en', 'Roadmap', 'our-roadmap' ),
);
$ids = array();
foreach ( $pages as $p ) {
	$tpl = json_decode( file_get_contents( "/templates/{$p[0]}.json" ), true );
	$existing = get_page_by_path( $p[2] );
	$id = $existing ? $existing->ID : wp_insert_post( array( 'post_type' => 'page', 'post_status' => 'publish', 'post_title' => $p[1], 'post_name' => $p[2] ) );
	update_post_meta( $id, '_elementor_edit_mode', 'builder' );
	update_post_meta( $id, '_elementor_template_type', 'wp-page' );
	update_post_meta( $id, '_wp_page_template', 'elementor_header_footer' );
	update_post_meta( $id, '_elementor_data', wp_slash( wp_json_encode( $tpl['content'] ) ) );
	update_post_meta( $id, '_elementor_page_settings', $tpl['page_settings'] );
	$ids[ $p[0] ] = $id;
	echo "{$p[0]} => $id\n";
}
update_option( 'show_on_front', 'page' );
update_option( 'page_on_front', $ids['home-nl'] );

if ( ! wp_get_nav_menu_object( 'Hoofdmenu NL' ) ) {
$menu = wp_create_nav_menu( 'Hoofdmenu NL' );
wp_update_nav_menu_item( $menu, 0, array( 'menu-item-object-id' => $ids['manifest-nl'], 'menu-item-object' => 'page', 'menu-item-type' => 'post_type', 'menu-item-status' => 'publish' ) );
wp_update_nav_menu_item( $menu, 0, array( 'menu-item-object-id' => $ids['roadmap-nl'], 'menu-item-object' => 'page', 'menu-item-type' => 'post_type', 'menu-item-status' => 'publish' ) );
set_theme_mod( 'nav_menu_locations', array( 'ub-primary' => $menu ) );
}

// Polylang: Dutch (default, no prefix) and English under /en/.
if ( function_exists( 'PLL' ) ) {
	$model = PLL()->model;
	if ( ! $model->get_language( 'nl' ) ) {
		$model->add_language( array( 'name' => 'Nederlands', 'slug' => 'nl', 'locale' => 'nl_NL', 'rtl' => 0, 'term_group' => 0, 'flag' => 'be' ) );
	}
	if ( ! $model->get_language( 'en' ) ) {
		$model->add_language( array( 'name' => 'English', 'slug' => 'en', 'locale' => 'en_GB', 'rtl' => 0, 'term_group' => 1, 'flag' => 'gb' ) );
	}
	// Polylang keeps its own options object; writing the WP option directly gets overwritten.
	$options                  = PLL()->options;
	$options['default_lang']  = 'nl';
	$options['hide_default']  = true;
	$options['force_lang']    = 1;
	$options['rewrite']       = true;
	$options['redirect_lang'] = true; // English front page at /en/ instead of /en/<page-name>/.
	$options->save();

	foreach ( array( 'home', 'manifest', 'roadmap' ) as $name ) {
		pll_set_post_language( $ids[ "$name-nl" ], 'nl' );
		pll_set_post_language( $ids[ "$name-en" ], 'en' );
		pll_save_post_translations( array( 'nl' => $ids[ "$name-nl" ], 'en' => $ids[ "$name-en" ] ) );
	}

	// One header menu per language.
	$menus = array();
	foreach ( array( 'nl' => array( 'manifest', 'roadmap' ), 'en' => array( 'manifest', 'roadmap' ) ) as $lang => $names ) {
		$label = "Hoofdmenu $lang";
		$obj   = wp_get_nav_menu_object( $label );
		if ( $obj ) {
			wp_delete_nav_menu( $obj->term_id );
		}
		$menus[ $lang ] = wp_create_nav_menu( $label );
		foreach ( $names as $name ) {
			wp_update_nav_menu_item( $menus[ $lang ], 0, array( 'menu-item-object-id' => $ids[ "$name-$lang" ], 'menu-item-object' => 'page', 'menu-item-type' => 'post_type', 'menu-item-status' => 'publish' ) );
		}
	}
	$nav_menus = $options['nav_menus'];
	$nav_menus[ get_stylesheet() ]['ub-primary'] = $menus;
	$options['nav_menus'] = $nav_menus;
	$options->save();
	PLL()->model->clean_languages_cache();
	set_theme_mod( 'nav_menu_locations', array( 'ub-primary' => $menus['nl'] ) );
	flush_rewrite_rules();
}

// Remove WordPress demo content so it does not end up in the static export.
$sample = get_page_by_path( 'sample-page' );
if ( $sample ) {
	wp_delete_post( $sample->ID, true );
}
$hello = get_page_by_path( 'hello-world', OBJECT, 'post' );
if ( $hello ) {
	wp_delete_post( $hello->ID, true );
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
