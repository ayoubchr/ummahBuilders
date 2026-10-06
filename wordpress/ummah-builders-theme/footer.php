<?php
/**
 * Site footer.
 *
 * @package UmmahBuilders
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
</div>

<footer class="ub-footer">
	<div class="ub-footer__inner">
		<a class="ub-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
			<span class="ub-brand__mark" aria-hidden="true">م</span>
			<span class="ub-brand__name">Ummah<span>Builders</span></span>
		</a>
		<nav aria-label="<?php echo esc_attr( ub_t( 'Footermenu', 'Footer menu' ) ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'ub-footer',
					'container'      => false,
					'depth'          => 1,
					'fallback_cb'    => false,
				)
			);
			?>
		</nav>
		<p>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> Ummah Builders</p>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
