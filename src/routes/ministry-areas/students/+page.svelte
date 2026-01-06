<script lang="ts">
	import ScrollingHero from '$lib/components/ScrollingHero.svelte';
	const rhythms = [
		{
			title: 'Sunday Nights',
			description: 'Middle and high school students gather for worship, teaching, and small groups.'
		},
		{
			title: 'Midweek Hangouts',
			description:
				'Grade-based meetups foster friendships, mentoring, and prayer throughout the year.'
		},
		{
			title: 'Retreats & Trips',
			description:
				'Seasonal retreats and mission trips help students grow in faith and servant leadership.'
		}
	];

	const commitments = [
		'Safe adult leaders invested in the next generation.',
		'Opportunities for students to serve on Sundays and across ministries.',
		'Bible-centered teaching that addresses real-life questions.',
		'Partnership with parents through regular communication and events.'
	];
</script>

<svelte:head>
	<title>Student Ministry - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="Students in grades 6–12 find community, grow as disciples, and discover their calling to live on mission with Jesus. Weekly gatherings, retreats, and mission trips."
	/>
</svelte:head>

<section class="bannerHero">
	<ScrollingHero currentPage="students" />
</section>

<section class="infoSection">
	<h1>CAC Youth Group welcomes students in grades 6th - 12th!</h1>
	<p>
		Our Youth Group for students at Community Alliance Church is a family-oriented, highly
		relational bunch of students and leaders. While we do have regular programming throughout the
		week, we also encourage youth and leaders to get together throughout the weeks and months to
		build strong relationships - whether it be working out together, going to each other's sports
		games, sharing meals, taking walks, practicing driving, or just being available to talk when
		needed. The middle- and high-school years are times in students' lives when having safe, trusted
		adults to lean on is invaluable.
	</p>

	<p>
		Whether it's the during school year or summer break, our programming typically involves a weekly
		Bible study and devotional time, rounded out with food, games and good conversation!
	</p>
</section>

<section class="infoSection">
	<h2>School Year Programming</h2>
	<div>
		<p>
			On the first Sunday of each month, students get to sleep in (wink, wink) and join the whole
			congregation at 10:30am for Sunday service (it's also our Communion Sunday). After the
			service, we'll often meet up at the family home of one of our students for an hour or two. We
			have lunch, do a quick devotional, and then spend the remaining time on a service project and
			games. This is a great time to bring friends who are new to church, as it's really about
			hanging out and having some fun!
		</p>

		<p>
			The other Sundays of the month, we meet for Bible study at 9:00am at the church. Our wonderful
			leaders make breakfast for us, which we eat while catching up with one another from the week.
			After our study and maybe a quick game or two, we wrap up around 10:15, in plenty of time to
			head to the morning service or to serve as volunteers in CaMA Kids.
		</p>
	</div>
</section>
<section class="infoSection">
	<h2>Summer Programming</h2>
	<div>
		<p>
			We're all about celebrating summer around here, and summer is an awesome time to mix things up
			with new ways to have a blast together while growing in our faith. Our Student Summer Nights
			Programming typically consists of campfires, games, food and devotional times, held weekly in
			the evening, from 6:30-8:00pm at the church (unless otherwise noted). ALL 6th-12th graders are
			welcome - bring your pals!
		</p>
	</div>
</section>
