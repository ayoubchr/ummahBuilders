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
<a class="ub-skip-link" href="#ub-content"><?php echo esc_html( ub_t( array( 'nl' => 'Naar de inhoud', 'en' => 'Skip to content', 'fr' => 'Aller au contenu', 'ar' => 'انتقل إلى المحتوى' ) ) ); ?></a>

<header class="ub-header">
	<div class="ub-header__inner">
		<a class="ub-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
			<span class="ub-brand__mark" aria-hidden="true">م</span>
			<span class="ub-brand__name">Ummah<span>Builders</span></span>
		</a>

		<nav id="ub-nav" class="ub-nav" aria-label="<?php echo esc_attr( ub_t( array( 'nl' => 'Hoofdmenu', 'en' => 'Main menu', 'fr' => 'Menu principal', 'ar' => 'القائمة الرئيسية' ) ) ); ?>">
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
		</nav>

		<div class="ub-header__actions">
			<?php ub_language_switcher(); ?>
			<button class="ub-menu-toggle" type="button" aria-controls="ub-nav" aria-expanded="false" aria-label="<?php echo esc_attr( ub_t( array( 'nl' => 'Menu openen', 'en' => 'Open menu', 'fr' => 'Ouvrir le menu', 'ar' => 'فتح القائمة' ) ) ); ?>">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
			</button>
		</div>
	</div>
</header>
<div id="ub-content" class="ub-main">
