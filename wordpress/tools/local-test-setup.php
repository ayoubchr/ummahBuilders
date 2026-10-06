<?php
// Test-only setup for a local Docker WordPress (templates mounted at /templates).
// Run: wp eval-file local-test-setup.php. Not part of the theme.
update_option( 'elementor_disable_color_schemes', 'yes' );
update_option( 'elementor_disable_typography_schemes', 'yes' );

$pages = array(
	array( 'home-nl', 'Home', 'home' ),
	array( 'manifest-nl', 'Manifest', 'manifest' ),
	array( 'roadmap-nl', 'Roadmap', 'roadmap' ),
	array( 'home-en', 'Home EN', 'home-en' ),
	array( 'manifest-en', 'Manifesto', 'manifesto' ),
	array( 'roadmap-en', 'Roadmap EN', 'roadmap-en' ),
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

\Elementor\Plugin::$instance->files_manager->clear_cache();
