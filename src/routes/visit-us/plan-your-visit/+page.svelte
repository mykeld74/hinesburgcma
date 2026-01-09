<script lang="ts">
	const serviceInfo = [
		{
			title: 'Service Time',
			content:
				"Our Sunday morning service begins at 10:30am and wraps up between 11:30am - 12:00pm. Prior to that, you'll hear the worship team practicing on stage and see the hospitality team getting coffee and bulletins ready. You might find adults who are finishing up their Bible study in the library, or see students wrapping up the 9:00am CAC Youth Group study. Some come early to catch up with friends in the lobby before the service begins. Come early, come on time... and if you're running late, come anyway! There's always a seat for you."
		},
		{
			title: 'Service Style',
			content:
				"Our Sunday morning service includes a variety of opportunities to share both praises and concerns, to pray with and for one another, and to celebrate what God is doing in our lives. The sermons are rooted in the Bible's truths. We read Scripture together and examine how it applies to our lives. Questions posed by our Pastor may be for us to answer internally, or perhaps to answer out loud, like in a classroom. Not to worry; sharing is always optional."
		},
		{
			title: 'Worship Style',
			content:
				"Led by a talented team of musicians, the ultimate goal of our Worship Team is to help you experience God's presence. At times the team consists of just one or two members, while other times a full band plays on stage! On most Sunday mornings, the music style is contemporary."
		},
		{
			title: 'Church Culture',
			content:
				"We're a pretty relaxed bunch, relating to each other like a family and not strangers who sit next to one another on Sunday mornings. Our dress is not formal and we don't care if you're having a bad hair day. Children are welcome wherever they're most comfortable: in the service or attending CaMA Kids (our children's programming). You're welcome to lift your hands in praise while you sing or to sit quietly in silent worship. You're welcome just as you are."
		}
	];

	const kidsStudentsInfo = [
		{
			title: 'Students (Middle & High School)',
			content:
				'During the school year, students in middle- and high-school (often referred to as "Youth Group") meet together before the worship service, from 9:00 - 10:00am... and breakfast and coffee are provided! Afterwards, students are encouraged to join their families for worship time and the sermon. On the first Sunday of each month, however, students take a break from their 9:00am meeting. Instead, they\'ll gather after the Sunday service for an hour-and-a-half of games, worship and lunch. This meeting is often held at a family member\'s home and is a great time for kids who are new to Student Ministries to check things out!'
		},
		{
			title: 'CaMA Kids (PreK - 5th Grade)',
			content:
				"For kids in grades PreK through 5th, there are two, age-based classrooms open with programming on Sunday mornings, beginning at 10:30am and running until the service ends. We call our kids' classes, CaMA Kids, or Christian and Missionary Alliance Kids. However, similar to Student Ministries, Kids Ministries takes a break from Sunday classes on the first Sunday of each month. Instead, kids of all ages join their families in the sanctuary for the morning service. And don't worry: if you're thinking, \"my child would never sit through grown-up church,\" then we've got you covered! We offer quiet activities for kids as they sit with their families (think coloring pages, books, fidget toys). If kids need a change of scenery, parents are always welcome to take their children into our library, where the sermon streams live on the TV."
		}
	];
</script>

<svelte:head>
	<title>Plan Your Visit - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="Plan your visit to Community Alliance Church in Hinesburg. Sunday service at 10:30am, contemporary worship, relaxed atmosphere. Kids programming (CaMA Kids) and student ministry available. Located at 190 Pond Road."
	/>
</svelte:head>

<section class="pageHero">
	<div class="pageHeroContent">
		<h1 class="pageHeroChild pageHeroTitle">Plan Your Visit</h1>
		<p class="pageHeroChild pageHeroText">
			<strong>New to Community Alliance Church? If so...</strong>
		</p>
	</div>
</section>
<section class="infoSection">
	<h2>Hello and Welcome!</h2>
	<p>
		Perhaps you're new to the area and looking for a church to call home. Maybe you're in town
		visiting family and would like to find a place to worship on Sunday. Or perhaps you're exploring
		Christianity for the first time (or the second or third) and are thinking of stopping by to
		learn more. Whatever the reason, you're welcome here anytime. We know it can be awkward walking
		into a new place, particularly if you don't know anyone.
	</p>
	<p>Below is some information about us that we hope will help you feel more comfortable:</p>
</section>

<section class="pageSection">
	<div class="cardGridSimple">
		{#each serviceInfo as info (info.title)}
			<article class="cardGridSimpleChild">
				<h3 class=" sectionLabel">{info.title}</h3>
				<p class="cardGridSimpleChild">{info.content}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Communion Sundays</h2>
	<p class="pageSectionText">
		The first Sunday of each month is when we hold Holy Communion. Anyone is welcome to share with
		us in this act of worship. As believers in Jesus Christ who accept Him as our Savior, communion
		is a vital part of remembering the sacrifice that He made for us. (Not sure how to accept Jesus
		as your Savior? Fill out this Connection Card or use our
		<a href="/about-us/contact-us/">Contact Us</a> page to let us know - we'd <em>love</em> to talk with
		you more about this!)
	</p>
	<p class="pageSectionText">
		You may also hear us refer to this day as <em>Celebration Sunday</em>. On this particular
		Sunday, we take a few moments during the service for members of our congregation to share ways
		in which they've seen God moving in their lives that month. This could be anything from an
		exciting announcement or the blessing of an answered prayer, to a prayer request for a difficult
		situation. Sharing these things with the whole church helps us remain connected to one another
		and to be watching for how God is showing up in our lives.
	</p>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Kids & Students</h2>
	<p class="pageSectionText">
		On most Sunday mornings during the school year, you'll find both the Student and Kids Ministries
		gathering for their regularly-scheduled programs. A regular exception to this is the <em
			>first Sunday of every month</em
		>. (The first Sundays also happen to be our Communion Sundays.)
	</p>
	<div class="cardGridSimple">
		{#each kidsStudentsInfo as info (info.title)}
			<article>
				<h3 class="cardGridSimpleChild cardGridSimpleTitle">{info.title}</h3>
				<p class="cardGridSimpleChild">{info.content}</p>
			</article>
		{/each}
	</div>
	<p class="pageSectionText">
		To find out more about school-year and summer programming for children of all ages, visit the
		<a href="/ministry-areas/kids/">Kids</a> page or the
		<a href="/ministry-areas/students/">Students</a> page.
	</p>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Location & Parking</h2>
	<p class="pageSectionText">
		Community Alliance Church is located at 190 Pond Road, in Hinesburg, VT 05461. We're right
		across Pond Road from the fields at Champlain Valley Union High School. On Sundays, you're
		welcome to park anywhere you like in our front and rear parking lots.
	</p>
	<table class="infoTable">
		<tbody>
			<tr>
				<th scope="row">Address</th>
				<td>190 Pond Road | Hinesburg, VT | 05461</td>
			</tr>
			<tr>
				<th scope="row">Phone</th>
				<td><a href="tel:+18024822132">(802) 482-2132</a></td>
			</tr>
			<tr>
				<th scope="row">Email</th>
				<td><a href="mailto:info@hinesburgcma.org">info@hinesburgcma.org</a></td>
			</tr>
		</tbody>
	</table>
</section>

<style>
	.pageHero {
		background: url('https://res.cloudinary.com/de6fzsubp/image/upload/v1762883202/WorshipBandonStage.jpg')
			no-repeat center 35% / cover;

		height: 40vh;
		place-content: center;
		place-items: center;
		text-align: center;
		color: #fff;
		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background: rgba(0, 0, 0, 0.5);
		}
	}
	.pageHeroText {
		color: #fff;
	}
</style>
