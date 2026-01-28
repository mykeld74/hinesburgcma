<script lang="ts">
	import ScrollingHero from '$lib/components/ScrollingHero.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import ContactFormModal from '$lib/components/ContactFormModal.svelte';
	import Image from '$lib/components/Image.svelte';

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
	<p>
		In the Bible, we see clearly that Jesus valued and loved children. We also find that God
		intended for a child’s instruction in the faith to be rooted within the family.
	</p>
	<p>
		Children’s Ministry at Community Alliance Church (which we call CaMA Kids!) teaches that
		children are an integral part of God’s family. We want them to learn:
	</p>

	<ul>
		<li>Who God is and what he has to say about them</li>

		<li>
			That Jesus Christ offers each of us eternal life and forgiveness from sin, through our belief
			in him and a lifelong relationship with him.
		</li>

		<li>About the wonder and joy that exists in a life spent following Jesus!</li>
	</ul>

	<p>
		In tandem with these goals, we seek to support families as they love and teach their children in
		the Christian faith.
	</p>
</section>

<section class="pageSection">
	<div class="accordionContainer">
		<Accordion title="Where should I take my children when I arrive at church?">
			<p>
				As you enter the front doors, you’ll want to head to the Children’s Ministry rooms: head
				down the hallway on the right side of the lobby, go past the bathrooms and kitchen, and into
				the children’s wing. You’ll typically find someone in the hallway with an orange lanyard and
				name tag who can help you and your kids find their classroom. You can also ask a greeter at
				the door where to go.
			</p>

			<p>Based on the week of the month and time of year, our Sunday school schedule can vary:</p>

			<ul>
				<li>
					During the school year, kids can attend CaMA Kids classes during the worship service,
					beginning at 10:30am. The exception to this is on Communion Sundays, the first Sunday of
					each month. During that service, all kids stay with their families in the sanctuary for
					the duration of the service. Quiet activities, such as coloring pages, picture books and
					quiet fidget toys are available at the back of the sanctuary. Kids are welcome to take
					activities back to their seats with them and return them at the end of service.
				</li>

				<li>
					In the summertime (i.e., when school breaks for summer), we often have a lighter class
					schedule, which we call our "Sabbath Summer.” We let the congregation know what that
					summer’s schedule will be prior to the end of the school year in June.
				</li>
			</ul>
		</Accordion>

		<Accordion title="What ages does CaMA Kids Serve?">
			<p>
				<strong>CaMA Kids programming serves kids in preschool (3 yrs) through 5th grade.</strong>
			</p>
			<p>
				On Sunday mornings, we usually have two classrooms open based on age range: our CaMA Kids
				Jr. room is for kids in preschool and kindergarten; and our CaMA Kids Elementary room is for
				kids in grades 1st - 5th. From 6th grade on, kids join our Student Ministries! (Link to SM
				page, please)
			</p>
		</Accordion>


		<Accordion title="What does CaMA Kids mean?">
			<p>
				CaMA Kids stands for Christian and Missionary Alliance Kids. Our church is part of the
				denomination known as the Christian and Missionary Alliance Church. You can learn more about
				us on the <a href="https://cmalliance.org" target="_blank" rel="noopener noreferrer"
					>denomination’s website</a
				>.
			</p>
		</Accordion>

		<Accordion title="Is there childcare for infants and toddlers?">
			<p>
				Since need fluctuates, we do not schedule this type of care for every week. (And kids are
				always welcome in the service with you!) We do have volunteers ready to step in, however, if
				you arrive and would like care for your infant or toddler. Toddlers are also welcome to try
				joining our CaMA Kids Jr. class! If you arrive at church with a little one and need a
				private or quiet space, please find a Children's Ministry worker (wearing an orange lanyard)
				or ask a greeter at the door.
			</p>
			<p>
				In addition, our library is always available for children accompanied by their parents. It
				has a TV with the live service streaming, as well as toys and books for children. You're
				always welcome to head there if your infant (or school-aged child!) needs a break from the
				sanctuary.
			</p>
		</Accordion>
		<Accordion title="Can my child(ren) stay in the worship service with me?">
			<p>
				Absolutely they can! We have coloring pages and materials, along with books and quiet toys,
				available for children who want to remain in the service. You can find them in the back
				corner of our sanctuary or ask a greeter for assistance.
			</p>

			<p>
				As mentioned above, we also have a library open to parents and their children if children
				need a break from the sanctuary. The service is streaming live in the library so parents
				don’t miss out.
			</p>
		</Accordion>

		<Accordion title="What is the lesson like?">
			<p>A typical Sunday morning lesson looks a bit like this:</p>
			<ul>
				<li>
					Once kids have all gathered in their classrooms, leaders start the morning with a brief
					welcome; often this is a game or opening prayer, a time to check in with each child and be
					sure everyone knows one another.
				</li>

				<li>
					In September 2023, we began using a curriculum called Wonder Ink. We are so excited to
					have access to this program for both our Junior and Elementary rooms. You can read more
					about this curriculum and its ministry <a
						href="https://www.wonderink.org"
						target="_blank"
						rel="noopener noreferrer">here</a
					>.
				</li>

				<li>
					Lessons usually are part of 4- to 5-week sessions. Each lesson includes teaching about a
					particular section of or theme in the Bible. Activities such as games, question-and-answer
					times, object lessons and crafts, all support the main idea and reinforce the Scripture
					being taught. Class specifics vary based on the gifting of that month's teacher.
				</li>
			</ul>
		</Accordion>

		<Accordion title="Does CAC hold a summertime Vacation Bible School?">
			<p>
				<strong>Yes, we sure do!</strong> Please check back here in April when registration opens. In
				the meantime, here are some details:
			</p>

			<ul>
				<li>
					Our 2026 Kids’ Week will be held Monday, June 29 through Friday, July 3. Camp runs from
					9:00 am to 3:00 pm.
				</li>

				<li>
					In recent years, we’ve held our summer camp at a local farm here in Hinesburg. This year,
					however, the full week of camp will be held at CAC.
				</li>

				<li>
					Children who will be entering grades 1 through 6 (or the homeschool equivalent) in the
					fall of 2026 are eligible to attend. Kids in any school district and of any (or no) church
					background are welcome!
				</li>

				<li>
					This is a FREE summer camp. Parents/caregivers are asked to provide a lunch for their
					child. Snacks are provided.
				</li>
			</ul>
		</Accordion>
		<Accordion title="Do you have other kids' events?">
			<p>
				<strong>Yes!</strong> During the school year, we host a monthly event for elementary kids called
				Club Night. This event happens monthly on the 3rd Thursday, from 6:00-7:30 pm, at the church.
				Club Night is a time when kids are encouraged to bring a friend, as it's a very relaxed environment.
				Kids play lots of games (almost always some form of tag!), do crafts, sing songs and have snack.
				The lesson is brief and is tailored to kids who may not be familiar with the Bible or Christianity.
				Parents of newcomers will be asked to fill out a registration form. All kids in grades 1st thru
				5th are welcome! No pre-registration necessary.
			</p>
		</Accordion>

		<Accordion title="How do you keep kids safe while in your programs?">
			<p>
				Safety in our children's program is a must. All adults who volunteer with children must have
				an up-to-date background check, which we initiate through our church. In addition, any
				teenager serving in a classroom must always be with an adult volunteer and be in frequent
				contact with a CAC staff person or adult volunteer for training and discipleship.
			</p>

			<p>
				Our church also has an active Safety Team, who works together with staff and ministry
				leaders to develop plans for emergencies and implement best practices for church safety.
			</p>
		</Accordion>
	</div>
</section>

<section class="pageSection">
	<p >
		If you still have questions or want to learn more, reach out to Amanda Wheeler. She'd love to chat with you!
	</p>
	<p class="pageSectionText">
		<strong>We can't wait to welcome you and your children into our church family!</strong>
	</p>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Our Staff</h2>
	<div class="staffCard">
		<div class="staffRoleContainer">
			<div class="staffRoleDescription">
				<h3 class="staffName">Amanda Wheeler</h3>
				<p class="staffRole">Family Ministries Director</p>
				<div class="staffContact">			
					<p>
						<strong>Phone:</strong>{' '}
						<a href="tel:8024822132">(802) 482-2132</a>
					</p>
					<p>
						<button class="contactButton" onclick={() => (modalOpen = true)}>Contact Us</button>
					</p>
				</div>
			</div>
			<div class="staffImage">
				<Image source="mattandamandawheeler" altTag="Amanda Wheeler" class="staffImage" />
			</div>
		</div>
	</div>
</section>

<ContactFormModal bind:isOpen={modalOpen} sendTo="awheeler@hinesburgcma.org" />

<style>
	.pageSection {
		display: block;
	}
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

	.staffRoleContainer {
		display: grid;
		grid-template-columns: 3fr 1fr;
		gap: 1rem;
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
		}
	}
	.staffImage {
		width: 100%;
		aspect-ratio: 1/1;
		object-fit: cover;
		border-radius: 18px;
		overflow: hidden;
	}
</style>
