<script lang="ts">
	import ScrollingHero from '$lib/components/ScrollingHero.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import ContactFormModal from '$lib/components/ContactFormModal.svelte';

	let modalOpen = $state(false);
</script>

<svelte:head>
	<title>Kids Ministry - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="CaMA Kids at Community Alliance Church: Children's ministry for PreK through 5th grade. Sunday school during service, monthly Club Night events, and summer VBS. We help kids meet, know, and follow Jesus."
	/>
</svelte:head>

<section class="bannerHero">
	<ScrollingHero currentPage="kids" />
</section>

<section class="pageSection">
	<h1 class="pageHeroTitle">Welcome to CaMA Kids!</h1>
	<p class="pageSectionText">
		Here at CAC, we call our Children's Ministry Program, <strong>CaMA Kids</strong>. The "<strong
			>CaMA</strong
		>" part stands for <em>Christian & Missionary Alliance</em>, the denomination of which Community
		Alliance Church is a part.
	</p>
	<p class="pageSectionText">
		Just as Jesus told His disciples, children should be welcomed into the church family and guided
		into their own personal relationship with Him. <em>(Matthew 19:14)</em>. The staff and
		volunteers in our Children's Ministry Program are blessed and excited to be able to share the
		love of Christ with our children. We're passionate about helping them to recognize and
		experience the wonders and blessings of a life pursuing Jesus Christ.
	</p>
</section>

<section class="pageSection">
	<div class="accordionContainer">
		<Accordion title="Does CAC hold a summertime Vacation Bible School?">
			<p><strong>Yes, we sure do!</strong></p>
			<p>
				We are incredibly excited to be partnering again with Prindle-Baldwin Farm here in
				Hinesburg, VT, to hold our summertime VBS (Vacation Bible School). Here are some details:
			</p>
			<ul>
				<li>
					The 2025 dates for this year's VBS are Monday, June 23 through Friday, June 27. Camp runs
					from 9:00am to 3:00pm.
				</li>
				<li>
					Children entering grades 1 through 6 (or the homeschool equivalent) in the fall of 2025
					are eligible to attend. Kids in any school district and of any - or no - church background
					are welcome!
				</li>
				<li>
					This is a FREE summer camp. Parents/caregivers are asked to provide a lunch for their
					child, but drinking water and light snacks are provided.
				</li>
				<li>
					The 2025 theme is "True North," and aims to teach kids that we can trust Jesus because He
					is THE unchanging "True North" throughout all of our lives.
				</li>
				<li>
					Camp days are spent mostly outdoors on the Prindle-Baldwin Farm, on Baldwin Road in
					Hinesburg. The week provides many opportunities for enjoying what kids love so much about
					summer: swimming, hiking, exploring nature, playing games and more!
				</li>
			</ul>
		</Accordion>

		<Accordion title="Where should kids go during the Sunday morning service?">
			<p><strong>This varies depending on the time of year:</strong></p>
			<p>
				During the school year, kids attend CaMA Kids Sunday school during the service, beginning at
				10:30am. The exception to this is on Communion Sundays, the first Sunday of each month.
				During that service, all kids stay with their families in the sanctuary for the duration of
				the service. Quiet activities, such as coloring pages, picture books and quiet fidget toys
				are available at the back of the sanctuary. Kids are welcome to take activities back to
				their seats with them and return them at the end of service.
			</p>
			<p>
				In the summer, we often switch up our typical Sunday morning lessons. We call this our
				<em>Sabbath Summer</em>. This year, from July 13 - August 24, 2025,
				<strong>all</strong>{' '}
				children (grades PreK thru those entering 6th grade in the fall) will join together for{' '}
				<strong>one</strong>, large Sunday morning class. We'll explore the theme "God is Our
				Fortress" through short lessons and hands-on building and craft activities. Children still
				will join their families in the sanctuary for the service on the 1st Sundays of August and
				September, as well as on Sunday, August 31, when we will take an end-of-summer break.
			</p>
			<p>
				Regular Sunday school classes for both CaMA Kids age groups will resume on September 14,
				2025.
			</p>
			<p>
				Our CaMA Kids classrooms are down the hallway that leads off from our lobby. If you're not
				sure where to go, look for one of the CaMA Kids volunteers with an orange lanyard or ask one
				of our greeters.
			</p>
		</Accordion>

		<Accordion title="What ages does CaMA Kids serve?">
			<p>
				When CaMA Kids is in session, we have separate classrooms open based on age range. Our CaMA
				Kids Jr. room is for kids in preschool and kindergarten. Our CaMA Kids Elementary room is
				for kids in grades 1st - 5th. From 6th grade on, kids head to our student youth group!
			</p>
		</Accordion>

		<Accordion title="Where do I take my infant/toddler?">
			<p>
				Our nursery room is always available, upon request, for anyone with an infant or toddler. We
				do not consistently keep the infant room open, as we do not always have children in this age
				range in attendance. However, if you arrive at church with an infant or toddler and need a
				private or quiet space, please find a Children's Ministry worker (wearing an orange lanyard)
				or ask a greeter at the door. In addition, our library is always open and has a TV with the
				live service streaming, as well as toys and books for children. You're always welcome to
				head there if your infant (or school-aged child!) needs a break from the sanctuary. We're
				here to help so don't hesitate to ask!
			</p>
		</Accordion>

		<Accordion title="What is the lesson like?">
			<p>A typical Sunday morning lesson looks a bit like this:</p>
			<ul>
				<li>
					Once kids have all gathered in their classrooms, leaders start the morning with a brief
					welcome. Sometimes this is a song or game, or sometimes a teacher opens in prayer. However
					it begins, the start of class is a chance to say hello and make sure everyone knows one
					another.
				</li>
				<li>
					In September 2023, we began using a curriculum called <strong>Wonder Ink</strong>. We are
					so excited to have access to this program for both our PreK/K and our elementary rooms.
					You can read more about this curriculum and its ministry{' '}
					<a href="https://www.wonderink.org/" target="_blank" rel="noopener noreferrer">here</a>
					.
				</li>
				<li>
					Most of the lessons taught are part of 4- to 5-week sessions. Each lesson includes
					teaching about and helping children to understand a particular section of the Bible.
					Activities such as games, question-and-answer times, object lessons and crafts, all
					support the main idea learned from the Bible lesson. Kids also work on memorizing a verse
					in the Bible pertinent to the current session. On some Sundays, a volunteer may join us to
					teach us a song or the teens may join us to do a funny skit. The specifics vary based on
					the gifting of that month's teacher.
				</li>
			</ul>
		</Accordion>

		<Accordion title="Do you have other kids' events?">
			<p>
				We sure do! During the school year, we host a monthly event for elementary kids called{' '}
				<em>Club Night</em>. This event takes place on the 3rd Thursday of each month, from
				6:30-8:00pm at the church. Club Night is an event to which kids are encouraged to bring a
				friend, as it's a very relaxed environment where kids can run, play games and sing loudly -
				in short, be kids! The lesson is brief and is tailored to kids who might not have heard much
				about the Bible or Christianity. Parents of newcomers will be asked to fill out a
				registration form. All kids in grades 1st thru 5th are welcome! No pre-registration
				necessary.
			</p>
		</Accordion>

		<Accordion title="Do adults that volunteer need to be background checked?">
			<p>
				Safety in our children's program is a must. All adults who volunteer with children must have
				an up-to-date background check, which we initiate through our church. In addition, any
				teenager serving in a classroom must always be with an adult volunteer, and be in frequent
				and regular contact with a CAC staff person or volunteer for training and discipleship.
			</p>
		</Accordion>
	</div>
</section>

<section class="pageSection">
	<p class="pageSectionText">
		<strong>We can't wait to welcome you and your children into our church family!</strong>
	</p>
	<p class="pageSectionText">
		Interested in knowing more? Reach out to Amanda Wheeler. She'd love to chat with you!
	</p>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Our Staff</h2>
	<div class="staffCard">
		<h3 class="staffName">Amanda Wheeler</h3>
		<p class="staffRole">Family Ministries Director</p>
		<div class="staffContact">
			<p>
				<strong>Address:</strong> 190 Pond Road | Hinesburg, VT | 05461
			</p>
			<p>
				<strong>Phone:</strong>{' '}
				<a href="tel:8024822132">(802) 482-2132</a>
			</p>
			<p>
				<strong>Email:</strong>{' '}
				<button class="inlineEmailLink" onclick={() => (modalOpen = true)}>info@hinesburgcma.org</button>
			</p>
		</div>
	</div>
</section>

<ContactFormModal bind:isOpen={modalOpen} sendTo="info@hinesburgcma.org" />

<style>
	.accordionContainer {
		display: grid;
		gap: clamp(1rem, 2.5vw, 1.5rem);
	}

	.staffCard {
		border: 1px solid color-mix(in oklch, var(--primaryColor) 40%, transparent);
		border-radius: 18px;
		background: color-mix(in oklch, var(--surfaceColor) 88%, black 12%);
		box-shadow:
			inset 0 0 0 1px color-mix(in oklch, var(--contrastColor) 6%, transparent),
			0 16px 24px color-mix(in oklch, black 35%, transparent);
		padding: clamp(1.5rem, 3vw, 2rem);
		display: grid;
		gap: 0.75rem;
	}

	.staffName {
		margin: 0;
		font-size: clamp(1.4rem, 0.8vw + 1.2rem, 1.8rem);
		color: var(--contrastColor);
	}

	.staffRole {
		margin: 0;
		font-size: clamp(1.1rem, 0.5vw + 1rem, 1.35rem);
		color: color-mix(in oklch, var(--contrastColor) 75%, transparent);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.staffContact {
		margin-top: 0.5rem;
		display: grid;
		gap: 0.5rem;
	}

	.staffContact p {
		margin: 0;
		color: color-mix(in oklch, var(--contrastColor) 85%, transparent);
		line-height: 1.75;
	}

	.staffContact a {
		color: var(--accentColor);
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	.inlineEmailLink {
		background: none;
		border: none;
		padding: 0;
		color: var(--accentColor);
		text-decoration: underline;
		cursor: pointer;
		font: inherit;
	}

	.inlineEmailLink:hover {
		text-decoration: none;
	}
</style>
