<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
</script>

<footer class="siteFooter">
	<div class="footerInner">
		<address>
			<div>190 Pond Road Hinesburg, VT 05461</div>
		</address>

		<ul>
			<li><a href="tel:+18024822132">Phone: (802) 482-2132</a></li>
			<li><a href="mailto:info@hinesburgcma.org">Email: info@hinesburgcma.org</a></li>
		</ul>

		<ul class="footerSocial">
			<li>
				<a href="https://www.youtube.com/@HinesburgCAC" aria-label="YouTube"
					><Icon name="youtube4" /></a
				>
			</li>
			<li>
				<a
					href="https://www.facebook.com/Community-Alliance-Church-70320201120"
					aria-label="Facebook"
				>
					<Icon name="facebook3" />
				</a>
			</li>
			<li>
				<a href="https://www.instagram.com/hinesburgcac/" aria-label="Instagram">
					<Icon name="instagram4" />
				</a>
			</li>
		</ul>
	</div>
	<div class="footerNote">
		<small>&copy;{new Date().getFullYear()} Community Alliance Church - Hinesburg</small>
	</div>
</footer>

<style>
	.siteFooter {
		background: var(--footerBackground);
		padding: clamp(1rem, 2vw, 2rem) clamp(1rem, 5vw, 3rem);
		color: color-mix(in oklab, var(--contrastColor) 90%, white);
		font-size: 0.85rem;
	}

	.footerInner {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: clamp(1.5rem, 3vw, 2.5rem);

		margin: 0 auto clamp(2rem, 3vw, 3rem);
	}

	address {
		font-style: normal;
		display: grid;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.35rem;
		align-items: center;
		justify-content: center;
	}

	a {
		color: inherit;
		font-weight: 500;
		transition: color 0.3s ease;
	}

	a:hover {
		color: var(--accentColor);
	}

	.footerNote {
		border-top: 1px solid color-mix(in oklab, var(--primaryColor) 25%, transparent);
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		justify-content: center;
		align-items: center;
		padding-top: 1.5rem;
		max-width: 1100px;
		margin: 0 auto;
		text-align: center;
	}

	.footerNote small {
		font-size: 0.75rem;
	}

	.footerSocial {
		display: flex;
		flex-direction: row;
		gap: 1.75rem;
	}
</style>
