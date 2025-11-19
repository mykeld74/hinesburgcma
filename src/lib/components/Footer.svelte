<footer class="siteFooter">
	<div class="footerInner">
		<section class="footerBrand">
			<h2>Community Alliance Church - Hinesburg</h2>
			<p>Following Jesus, sharing hope, and serving our neighbors in the heart of Hinesburg.</p>
			<a class="footerButton" href="/visit-us/plan-your-visit/">Plan Your Visit</a>
		</section>
		<section>
			<h3>Visit</h3>
			<address>
				<div>190 Pond Road</div>
				<div>Hinesburg, VT 05461</div>
				<div>Worship Gathering • Sundays at 10:30am</div>
			</address>
		</section>
		<section>
			<h3>Connect</h3>
			<ul>
				<li><a href="tel:+18024822132">(802) 482-2132</a></li>
				<li><a href="mailto:info@hinesburgcma.org">info@hinesburgcma.org</a></li>
				<li><a href="/resources/calendar/">Church Calendar</a></li>
				<li><a href="/resources/giving/">Give Online</a></li>
			</ul>
		</section>
		<section>
			<h3>Stay Connected</h3>
			<ul>
				<li><a href="https://www.youtube.com/@HinesburgCAC">YouTube</a></li>
				<li><a href="https://www.facebook.com/HinesburgCMA/">Facebook</a></li>
				<li>
					<a href="https://apps.apple.com/us/app/church-center-app/id1357742931">Get the CAC App</a>
				</li>
				<li><a href="/resources/external-resources/">External Resources</a></li>
			</ul>
		</section>
	</div>
	<div class="footerNote">
		<small>&copy; {new Date().getFullYear()} Community Alliance Church - Hinesburg. All rights reserved.</small>
		<a href="/resources/cvu-parking/">CVU Parking</a>
		<a href="/grow-with-us/your-next-steps/">Your Next Steps</a>
	</div>
</footer>

<style>
	.siteFooter {
		background: radial-gradient(
			circle at top left,
			color-mix(in oklab, var(--primaryColor) 30%, black),
			var(--backgroundColor)
		);
		padding: clamp(2.5rem, 4vw, 4rem) clamp(1rem, 5vw, 3rem);
		color: color-mix(in oklab, var(--contrastColor) 90%, white);

		& .footerInner {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: clamp(1.5rem, 3vw, 2.5rem);
			max-width: 1100px;
			margin: 0 auto clamp(2rem, 3vw, 3rem);

			& .footerBrand {
				& h2 {
					font-size: clamp(1.25rem, 0.7vw + 1.2rem, 1.6rem);
					margin: 0 0 0.75rem;
				}

				& p {
					margin: 0 0 1rem;
					max-width: 32ch;
					font-weight: 500;
				}

				& .footerButton {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					font-weight: 600;
					padding: 0.6rem 1.2rem;
					border-radius: 999px;
					background-color: color-mix(in oklab, var(--primaryColor) 45%, transparent);
					color: var(--contrastColor);

					&:hover {
						background-color: color-mix(in oklab, var(--primaryColor) 65%, transparent);
					}
				}
			}
		}

		& h3 {
			text-transform: uppercase;
			letter-spacing: 0.1em;
			font-size: 0.85rem;
			margin: 0 0 0.75rem;
		}

		& address {
			font-style: normal;
			display: grid;
			gap: 0.35rem;
		}

		& ul {
			list-style: none;
			margin: 0;
			padding: 0;
			display: grid;
			gap: 0.35rem;
		}

		& a {
			color: inherit;
			font-weight: 500;

			&:hover {
				color: var(--accentColor);
			}
		}

		& .footerNote {
			border-top: 1px solid color-mix(in oklab, var(--primaryColor) 25%, transparent);
			display: flex;
			flex-wrap: wrap;
			gap: 0.75rem;
			justify-content: space-between;
			align-items: center;
			padding-top: 1.5rem;
			max-width: 1100px;
			margin: 0 auto;

			& small {
				font-size: 0.75rem;
			}

			& a {
				font-size: 0.75rem;
			}

			@media (max-width: 720px) {
				& {
					flex-direction: column;
					align-items: flex-start;
				}
			}
		}
	}
</style>
