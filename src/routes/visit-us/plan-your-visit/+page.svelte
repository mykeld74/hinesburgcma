<script lang="ts">
	const arrivalSteps = [
		{
			title: 'Arrive & Park',
			description:
				'Parking is available on campus with overflow at the CVU athletic fields directly across the street.'
		},
		{
			title: 'Grab a Coffee',
			description:
				'Our café opens 20 minutes before service. Enjoy a warm drink and meet our welcome team.'
		},
		{
			title: 'Kids Check-In',
			description:
				'Families can check in at the Kids Ministry desk. First-time families receive a brief tour.'
		},
		{
			title: 'Find Your Seat',
			description:
				'Hosts are available to help you find seats and answer questions about the worship gathering.'
		}
	];

	const serviceRhythm = [
		'Live worship led by our band',
		'Stories of what God is doing in our community',
		'Teaching rooted in Scripture and practical for everyday life',
		'Prayer and response moments with our pastors',
		'Opportunities to connect after the gathering'
	];
</script>

<svelte:head>
	<title>Plan Your Visit - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="We cannot wait to welcome you. Explore what to expect before you arrive and how to make the most of your first Sunday with us. Service at 10:30am, 190 Pond Road, Hinesburg VT."
	/>
</svelte:head>

<section class="pageHero">
	<h1>Plan Your Visit</h1>
	<p>
		We cannot wait to welcome you. Explore what to expect before you arrive and how to make the most
		of your first Sunday with us.
	</p>
	<div class="pageHeroActions">
		<a href="/grow-with-us/your-next-steps/">Attend Next Steps</a>
		<a href="mailto:info@hinesburgcma.org">Ask a Question</a>
	</div>
</section>

<section class="pageSection">
	<h2>Service Details</h2>
	<table class="infoTable">
		<tbody>
			<tr>
				<th scope="row">Gathering Time</th>
				<td>Sundays at 10:30am</td>
			</tr>
			<tr>
				<th scope="row">Location</th>
				<td>190 Pond Road, Hinesburg VT 05461</td>
			</tr>
			<tr>
				<th scope="row">Parking</th>
				<td>On-site parking with additional spaces across the street at CVU</td>
			</tr>
			<tr>
				<th scope="row">Kids & Students</th>
				<td>Age-specific programming before and during the service</td>
			</tr>
		</tbody>
	</table>
</section>

<section class="pageSection">
	<h2>When You Arrive</h2>
	<div class="cardGridSimple">
		{#each arrivalSteps as step}
			<article>
				<h3>{step.title}</h3>
				<p>{step.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>Your Worship Experience</h2>
	<p>
		Our services last about 75 minutes. You will join a welcoming, multi-generational community ready
		to meet you where you are on your faith journey.
	</p>
	<ul>
		{#each serviceRhythm as element}
			<li>{element}</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2>Let Us Know You Are Coming</h2>
	<p>
		We would love to reserve seats, introduce you to a pastor, and show you around the building.
		Reach out and our team will follow up with details before Sunday.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Email Our Team</a>
		<a href="tel:+18024822132">Call (802) 482-2132</a>
	</div>
</section>

