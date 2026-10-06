<?php
/**
 * Site header. Replaces the Hello Elementor header so it works without Elementor Pro's Theme Builder.
 *
 * @package UmmahBuilders
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="ub-skip-link" href="#ub-content"><?php echo esc_html( ub_t( 'Naar de inhoud', 'Skip to content' ) ); ?></a>

<header class="ub-header">
	<div class="ub-header__inner">
		<a class="ub-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
			<span class="ub-brand__mark" aria-hidden="true">م</span>
			<span class="ub-brand__name">Ummah<span>Builders</span></span>
		</a>

		<nav id="ub-nav" class="ub-nav" aria-label="<?php echo esc_attr( ub_t( 'Hoofdmenu', 'Main menu' ) ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'ub-primary',
					'container'      => false,
					'depth'          => 1,
					'fallback_cb'    => false,
				)
			);
			?>
			<a class="ub-nav__login" href="#ub-login"><?php echo esc_html( ub_t( 'Inloggen', 'Log in' ) ); ?></a>
		</nav>

		<div class="ub-header__actions">
			<?php ub_language_switcher(); ?>
			<a class="ub-btn ub-btn--ghost ub-btn--sm" href="#ub-login"><?php echo esc_html( ub_t( 'Inloggen', 'Log in' ) ); ?></a>
			<a class="ub-btn ub-btn--primary ub-btn--sm" href="#ub-join"><?php echo esc_html( ub_t( 'Word lid', 'Join' ) ); ?></a>
			<button class="ub-menu-toggle" type="button" aria-controls="ub-nav" aria-expanded="false" aria-label="<?php echo esc_attr( ub_t( 'Menu openen', 'Open menu' ) ); ?>">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
			</button>
		</div>
	</div>
</header>
<div id="ub-content" class="ub-main">
