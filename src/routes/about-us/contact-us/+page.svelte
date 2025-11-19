<script lang="ts">
	const officeHours = [
		{ day: 'Monday', time: '9:00am – 3:00pm' },
		{ day: 'Tuesday', time: '9:00am – 3:00pm' },
		{ day: 'Wednesday', time: '9:00am – 3:00pm' },
		{ day: 'Thursday', time: '9:00am – 3:00pm' },
		{ day: 'Friday', time: 'Closed' }
	];
</script>

<svelte:head>
	<title>Contact Us - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="We would love to hear from you. Send a message, call the office at (802) 482-2132, or stop by during the week—our team is here to help. Located at 190 Pond Road, Hinesburg VT."
	/>
</svelte:head>

<section class="pageHero">
	<h1>Contact Us</h1>
	<p>
		We would love to hear from you. Send a message, call the office, or stop by during the week—our
		team is here to help.
	</p>
</section>

<section class="pageSection">
	<h2>Reach the Team</h2>
	<ul>
		<li>Email: <a href="mailto:info@hinesburgcma.org">info@hinesburgcma.org</a></li>
		<li>Phone: <a href="tel:+18024822132">(802) 482-2132</a></li>
		<li>Address: 190 Pond Road, Hinesburg VT 05461</li>
	</ul>
</section>

<section class="pageSection">
	<h2>Office Hours</h2>
	<ul>
		{#each officeHours as slot}
			<li>
				<strong>{slot.day}</strong> — {slot.time}
			</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2>Prayer & Care</h2>
	<p>
		Need prayer, care, or assistance? Reach out and our pastors and care teams will be in contact
		with you quickly.
	</p>
	<div class="pageHeroActions">
		<a href="/ministry-areas/prayer-care/">Prayer & Care</a>
		<a href="mailto:info@hinesburgcma.org">Submit a Prayer Need</a>
	</div>
</section>

