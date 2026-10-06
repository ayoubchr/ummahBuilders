<?php
/**
 * Ummah Builders child theme.
 *
 * @package UmmahBuilders
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'UB_THEME_VERSION', '1.0.0' );

/**
 * Styles and scripts.
 */
function ub_enqueue_assets() {
	wp_enqueue_style(
		'ub-fonts',
		'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap',
		array(),
		null
	);
	wp_enqueue_style(
		'ub-theme',
		get_stylesheet_uri(),
		array( 'hello-elementor', 'ub-fonts' ),
		UB_THEME_VERSION
	);
	wp_enqueue_script(
		'ub-theme',
		get_stylesheet_directory_uri() . '/assets/theme.js',
		array(),
		UB_THEME_VERSION,
		true
	);
	wp_localize_script(
		'ub-theme',
		'ubTheme',
		array(
			'appUrl' => esc_url_raw( ub_app_url() ),
		)
	);
}
add_action( 'wp_enqueue_scripts', 'ub_enqueue_assets', 20 );

/**
 * Menus: header and footer. With Polylang, assign one menu per language.
 */
function ub_register_menus() {
	register_nav_menus(
		array(
			'ub-primary' => __( 'Hoofdmenu', 'ummah-builders' ),
			'ub-footer'  => __( 'Footermenu', 'ummah-builders' ),
		)
	);
}
add_action( 'after_setup_theme', 'ub_register_menus' );

/**
 * Customizer: URL of the member app (login / join links point there).
 */
function ub_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'ub_app',
		array(
			'title'    => __( 'Ummah Builders ledenapp', 'ummah-builders' ),
			'priority' => 30,
		)
	);
	$wp_customize->add_setting(
		'ub_app_url',
		array(
			'default'           => 'https://app.ummahbuilders.be',
			'sanitize_callback' => 'esc_url_raw',
		)
	);
	$wp_customize->add_control(
		'ub_app_url',
		array(
			'label'       => __( 'URL van de ledenapp', 'ummah-builders' ),
			'description' => __( 'Knoppen met link #ub-login en #ub-join gaan naar /login en /onboarding op dit adres.', 'ummah-builders' ),
			'section'     => 'ub_app',
			'type'        => 'url',
		)
	);
}
add_action( 'customize_register', 'ub_customize_register' );

function ub_app_url() {
	return untrailingslashit( get_theme_mod( 'ub_app_url', 'https://app.ummahbuilders.be' ) );
}

/**
 * Translate a short UI string for the current language.
 * Uses Polylang's string translations when available, otherwise the Dutch default.
 */
function ub_t( $nl, $en ) {
	if ( function_exists( 'pll_current_language' ) && 'en' === pll_current_language() ) {
		return $en;
	}
	return $nl;
}

/**
 * Language switcher (Polylang). Renders nothing when Polylang is not active.
 */
function ub_language_switcher() {
	if ( ! function_exists( 'pll_the_languages' ) ) {
		return;
	}
	echo '<nav class="ub-lang" aria-label="' . esc_attr( ub_t( 'Taal', 'Language' ) ) . '"><ul>';
	pll_the_languages(
		array(
			'display_names_as' => 'slug',
			'hide_if_empty'    => 0,
		)
	);
	echo '</ul></nav>';
}
