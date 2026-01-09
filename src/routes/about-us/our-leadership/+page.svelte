<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	import LeaderCard from '$lib/components/LeaderCard.svelte';

	type Leader = {
		name: string;
		role: string | string[];
		description: string | string[];
		email?: string;
		image?: string;
	};

	let selectedLeader: Leader | null = $state(null);
	let isModalOpen = $state(false);

	function openModal(leader: Leader) {
		selectedLeader = leader;
		// Wait for DOM to update before adding open class to trigger animation
		requestAnimationFrame(() => {
			isModalOpen = true;
		});
		document.body.style.overflow = 'hidden';
	}

	function closeModal() {
		isModalOpen = false;
		// Wait for animation to complete before clearing leader
		setTimeout(() => {
			if (!isModalOpen) {
				selectedLeader = null;
			}
		}, 300);
		document.body.style.overflow = '';
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isModalOpen) {
			closeModal();
		}
	}

	const pastorsAndElders: Leader[] = [
		{
			name: 'Scott & Amy Mansfield',
			role: 'Lead Pastor/Elder',
			email: 'smansfield@hinesburgcma.org',
			description: [
				'Pastor Scott Mansfield has served Community Alliance Church since June of 2002. He is the teaching pastor and works with a team of elders, staff, and a leadership team to provide pastoral care, oversight of vision and mission, as well as disciple-making ministries, both inside and outside of the church walls.',

				'Prior to their calling to Hinesburg, VT, Scott and Amy lived in Colorado. They served with an inner-city ministry in Denver for many years, caring for at-risk young adults, teens and families through Christian counseling, family support, residential treatment and emancipation services.',

				'Scott and Amy are new "empty nesters," having raised their three children on the family farm in Starksboro. Through the years, they\'ve spent countless hours with their children and their friends, enjoying lots of soccer, baseball, basketball and football games together. Brandon, their oldest, is newly married and enjoys being a sugar maker on the farm. Abigail recently completed her masters degree and is beginning her career in the Boston area, in the field of strength and conditioning. Adam, their youngest, is away at college in Florida playing football. Mookie, the Australian Shepherd, and Steven, the cat, keep Scott and Amy company these days at home.',

				'In their spare time, Amy can be found in her gardens and Scott can be found in his woodshop. They enjoy making furniture, helping with hay, growing vegetables and flowers, helping with the Christmas tree farm, and occasionally chasing wayward cows.'
			],
			image: 'MansfieldSA'
		},
		{
			name: 'Rolly & Kathy Delfausse',
			role: 'Elder',
			email: 'kdelfausse@myfairpoint.net',
			description: '',
			image: 'delfausse'
		},
		{
			name: 'Dave & Janet Russell',
			role: 'Elder',
			email: 'therussellfarm@gmail.com',
			description: [
				'David and Janet Russell have been at CAC for nearly 40 years,  David serves as an elder supporting Paster Scott and Janet helps with working with the Pre-K children when needed.',
				'David and Janet have lived on their dairy farm in Starksboro for 54 years. They have a Christmas tree business with horse drawn rides.  They have 3 adult daughters and 6 grandchildren.',
				'David enjoys baking pies and making homemade ice cream.'
			],
			image: 'russellDJ'
		},
		{
			name: 'Ray & Carol Bulaga',
			email: 'rjbulaga@aol.com',
			role: 'Elder',
			description: '',
			image: 'bulaga'
		},
		{
			name: 'Jeff & Kristen Hammond',
			email: 'streetmachine19@comcast.net',
			role: 'Elder',
			description: '',
			image: 'hammond'
		},
		{
			name: 'Brandon & Mary-Kate Mansfield',
			email: 'bmans09@gmail.com',
			role: 'Elder',
			description: [
				'Brandon and Mary-Kate Mansfield lead our Student Ministry Team here at CAC and have been serving since September of 2022. As Student Ministry leaders, Brandon and Mary-Kate focus on creating and writing curriculum for the group (which we call Youth Group) as well as heading up local events and trips to camps throughout the year. Their passion is to continually disciple and share the gospel with youth and to compliment what students are learning at home, all while building real friendships with them.',

				"In addition to working at CAC, Brandon works for a construction company in Vergennes, runs their maple sugaring business and works on his family's diversified farm in Starksboro. Mary-Kate is a physical therapist for Addison County Home Health and Addison County Outpatient Therapy. Together, they also volunteer for Addison County YoungLife.",

				'Brandon and Mary-Kate both grew up in Addison County and were good friends and high school sweethearts at Mount Abraham. In October of 2022, Brandon and Mary-Kate were married. They currently reside in Bristol with their Aussie/Golden Retriever, Lady May. In their free time, Brandon and Mary-Kate can be found skiing, lifting weights, reading books by the water, playing pickleball, and going for walks with Lady May.',

				'Among their favorite things are: Chocolate Creemees (with chocolate sprinkles!); vacationing in Cape Cod; cooking up steak and potatoes, watching the Denver Broncos (Brandon) and Buffalo Bills (Mary-Kate).'
			],
			image: 'brandonandmarykate'
		}
	];

	const deacons: Leader[] = [
		{
			name: 'George Aube',
			role: 'Deacon',
			email: 'georgea@gmavt.net',
			description: '',
			image: 'aube'
		},
		{
			name: 'Claire Aube',
			role: 'Deacon',
			email: 'chiaube1950@gmail.com',
			description: '',
			image: 'aube'
		},
		{
			name: 'Kevin McDonald',
			role: 'Deacon',
			email: 'treecamo1@aol.com',
			description: '',
			image: 'mcdonald'
		},
		{
			name: 'Gayla McDonald',
			role: 'Deacon',
			email: 'gmcdonald@gmavt.net',
			description: '',
			image: 'mcdonald'
		},
		{
			name: 'Donna Meyers',
			role: 'Deacon',
			email: 'donnanalette@gmavt.net',
			description: '',
			image: 'donna'
		},
		{
			name: 'Terri Thibault',
			role: 'Deacon',
			email: 'terri_norm@yahoo.com',
			description: '',
			image: 'terri'
		},

		{
			name: 'Brian Thon',
			role: 'Deacon',
			email: 'brian.thon@gmail.com',
			description: '',
			image: 'thon'
		},
		{
			name: 'Denver Wilson',
			role: 'Deacon',
			email: 'denverwilson82@hotmail.com',
			description: '',
			image: 'wilson'
		}
	];

	const directors: Leader[] = [
		{
			name: 'Bill Cooper',
			role: 'Worship Director',
			email: 'william_c_cooper@msn.com',
			description: [
				'William, a life long Vermonter, lives with his wife Melinda in South Burlington.  Both have served at CAC through the years with children, youth and worship ministries.  Their own children, Sierra and Teagan (now all grown up), were raised with the help of the Community Alliance Church family.  Bill took the position of Worship Director in 2010, and enjoys his roll as Worship Leader & Leadership Team member.  Bill is also a business owner in South Burlington, where he has enjoyed a 30 year career as an independent insurance agent.',

				'God has richly blessed Melinda and I over the many years we have been involved here at CAC.  We look forward to all He has planned for us in the years to come.'
			],
			image: 'Cooper'
		},

		{
			name: 'Amanda Wheeler',
			role: 'Family Ministries Director',
			email: 'awheeler@hinesburgcma.org',
			description: [
				"Amanda works at CAC as the Family Ministries Director. She has served in this role since February of 2020. Amanda oversees the Children's Ministry Programs for kids aged PreK through 5th grade, as well as the program's fantastic volunteers. She also works with the Student Ministry leaders to maintain connections amongst all of the family ministries at CAC. Amanda loves investing in the youngest members of God's church by teaching, playing with and building relationships with the kids and their families. She is passionate about helping kids experience the wonders that can be found in a daily life with Our Creator, God.",
				"Amanda has a BFA from the New York State College of Ceramics at Alfred University, with concentrations in graphic design and photography. She worked as an Information Architect for several years after college. God then showed her a different path, through volunteer work first, then full-time employment, at an emergency shelter for survivors of domestic violence. After her kids were born, Amanda was a full-time, stay-at-home mother for years. Amanda and her family live in Hinesburg. She met her husband, Matt, in 2001, two months after she moved to Vermont. They began dating and then were married in 2006. Amanda and Matt have two awesome kids together: Noah and Laena. Noah shares Amanda's sense of humor and love of words, while Laena shares Amanda's love of crafting and learning to care for God's earth.",

				"Among Amanda's favorite things are: cats, strong coffee, mustard greens, insects, Calvin and Hobbes, and being in her gardens."
			],
			image: 'mattandamandawheeler'
		},
		{
			name: 'Brandon & Mary Kate Mansfield',
			role: 'Students & Young Adult Ministries',
			email: 'bmans09@gmail.com',
			description: [
				'Brandon and Mary-Kate Mansfield lead our Student Ministry Team here at CAC and have been serving since September of 2022. As Student Ministry leaders, Brandon and Mary-Kate focus on creating and writing curriculum for the group (which we call Youth Group) as well as heading up local events and trips to camps throughout the year. Their passion is to continually disciple and share the gospel with youth and to compliment what students are learning at home, all while building real friendships with them.',

				"In addition to working at CAC, Brandon works for a construction company in Vergennes, runs their maple sugaring business and works on his family's diversified farm in Starksboro. Mary-Kate is a physical therapist for Addison County Home Health and Addison County Outpatient Therapy. Together, they also volunteer for Addison County YoungLife.",

				'Brandon and Mary-Kate both grew up in Addison County and were good friends and high school sweethearts at Mount Abraham. In October of 2022, Brandon and Mary-Kate were married. They currently reside in Bristol with their Aussie/Golden Retriever, Lady May. In their free time, Brandon and Mary-Kate can be found skiing, lifting weights, reading books by the water, playing pickleball, and going for walks with Lady May.',

				'Among their favorite things are: Chocolate Creemees (with chocolate sprinkles!); vacationing in Cape Cod; cooking up steak and potatoes, watching the Denver Broncos (Brandon) and Buffalo Bills (Mary-Kate).'
			],
			image: 'brandonandmarykate'
		}
	];

	const ministrySupport: Leader[] = [
		{
			name: 'George Aube',
			role: 'Safety Team Leader',
			description: '',
			image: 'aube'
		},
		{
			name: 'Ray & Carol Bulaga',
			role: 'Community Group Coordinators',
			description: '',
			email: 'info@hinesburgcma.org',
			image: 'bulaga'
		},
		{
			name: 'Lance Fournier',
			role: 'Grounds Coordinator',
			description: '',
			email: 'lance4nier@myfairpoint.net',
			image: 'fourniers'
		},
		{
			name: 'Josh Leckey',
			role: 'Dominican Republic Team Leader',
			description: '',
			email: 'joshdleckey@gmail.com',
			image: 'leckey'
		},
		{
			name: 'Amy Mansfield',
			role: "Women's Ministry",
			description: '',
			email: 'amansfield@hinesburgcma.org',
			image: 'MansfieldSA'
		},
		{
			name: 'Liza Rixon',
			role: ['Downtown Ministry', 'Dominican Republic Team Leader'],
			description: '',
			email: 'lizarixon@gmail.com',
			image: 'liza'
		},
		{
			name: 'Dave Russell',
			role: "Men's Ministry",
			description: '',
			email: 'amansfield@hinesburgcma.org',
			image: 'russellDJ'
		},

		{
			name: 'Jesse Tipton',
			role: 'Downtown Ministry',
			description: '',
			email: 'jessetipton4@gmail.com',
			image: 'tipton'
		},
		{
			name: 'Matt Wheeler',
			role: 'Mowing Coordinator',
			description: '',
			email: 'wheelemm@gmail.com',
			image: 'mattandamandawheeler'
		}
	];

	const electedOperations: Leader[] = [
		{
			name: 'Rolly Delfausse',
			role: 'Treasurer',
			description: '',
			email: 'rolly.delfausse@protonmail.com',
			image: 'Delfausse'
		},
		{
			name: 'Fred Haulenbeek',
			role: 'Assistant Treasurer',
			description: '',
			email: 'fredhaul@gmail.com',
			image: 'haulenbeek'
		},

		{
			name: 'Liza Rixon',
			role: 'Executive Secretary',
			description: '',
			email: 'lizarixon@gmail.com',
			image: 'liza'
		}
	];
</script>

<svelte:head>
	<title>Our Leadership - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="Meet the leadership team at Community Alliance Church. Our pastors, elders, deacons, and ministry directors serve together to guide our church family in following Jesus on mission in Hinesburg and beyond."
	/>
</svelte:head>

<section class="pageHero">
	<div class="pageHeroContent">
		<h1 class="pageHeroChild pageHeroTitle">Our Leadership</h1>
		<p class="pageHeroChild pageHeroText">
			We are guided by a team of pastors, staff, elders, and ministry leaders who serve together to
			help our church follow Jesus on mission.
		</p>
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Pastors & Elders</h2>
	<div class="cardGridSimple">
		{#each pastorsAndElders as leader}
			<LeaderCard {leader} {openModal} />
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Ministry Leaders</h2>
	<div class="cardGridSimple">
		{#each directors as leader}
			<LeaderCard {leader} {openModal} />
		{/each}
	</div>
</section>
<section class="pageSection">
	<h2 class="pageSectionTitle">Deacons</h2>
	<div class="cardGridSimple">
		{#each deacons as leader}
			<LeaderCard {leader} {openModal} />
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Ministry Support</h2>
	<div class="cardGridSimple">
		{#each ministrySupport as leader}
			<LeaderCard {leader} {openModal} />
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Elected Operations</h2>
	<div class="cardGridSimple">
		{#each electedOperations as leader}
			<LeaderCard {leader} {openModal} />
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Contact Our Team</h2>
	<p class="pageSectionText">
		Reach out to the office and we will connect you with the right leader to answer questions, pray,
		or help you take a next step.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Email the Office</a>
		<a href="/about-us/contact-us/">Contact Form</a>
	</div>
</section>

{#if selectedLeader}
	<div
		class="modalBackdrop"
		class:open={isModalOpen}
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="-1"
	>
		<div class="modalContent" class:open={isModalOpen}>
			<button class="modalClose" onclick={closeModal} aria-label="Close modal">×</button>
			{#if selectedLeader.image}
				<div class="leaderModalHeader">
					<h2 id="modal-title" class="modalTitle">{selectedLeader.name}</h2>
					<div class="modalCardImage">
						<Image
							source={selectedLeader.image}
							altTag={selectedLeader.name}
							class="modalLeaderImage"
						/>
					</div>
				</div>
			{:else}
				<h2 id="modal-title" class="modalTitle">{selectedLeader.name}</h2>
			{/if}
			{#if Array.isArray(selectedLeader.role)}
				{#each selectedLeader.role as role}
					<strong class="modalRole">{role}</strong>
				{/each}
			{:else}
				<strong class="modalRole">{selectedLeader.role}</strong>
			{/if}

			<div class="modalDescription">
				{#if Array.isArray(selectedLeader.description) && selectedLeader.description.length > 0}
					{#each selectedLeader.description as paragraph}
						<p>{paragraph}</p>
					{/each}
				{:else if !Array.isArray(selectedLeader.description)}
					<p>{selectedLeader.description}</p>
				{/if}
			</div>
			{#if selectedLeader.email}
				<a href="mailto:{selectedLeader.email}" class="modalEmail">Email {selectedLeader.name}</a>
			{/if}
		</div>
	</div>
{/if}

<style>
	.pageSection {
		width: calc(100% - 2rem);
		max-width: 1800px;
		margin: 0 auto 4rem;
	}
	.modalBackdrop {
		position: fixed;
		inset: 0;
		background: color-mix(in oklch, var(--backgroundColor) 85%, black 15%);
		z-index: 1000;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.5s ease;
		display: grid;
		place-items: center;
	}

	.modalBackdrop.open {
		opacity: 1;
		pointer-events: auto;
	}

	.modalContent {
		width: calc(100% - 4rem);
		max-width: 900px;
		background: color-mix(in oklch, var(--backgroundColor) 96%, black 4%);
		border-radius: 20px;
		padding: clamp(2rem, 4vw, 3rem);
		max-height: 85vh;
		overflow-y: auto;
		transform: translateY(100vh);
		transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 -26px 42px color-mix(in oklch, black 50%, transparent);
	}

	.modalContent.open {
		transform: translateY(0);
	}

	.modalClose {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: transparent;
		border: none;
		font-size: 2rem;
		line-height: 1;
		cursor: pointer;
		color: var(--contrastColor);
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: background 0.2s ease;
	}

	.modalClose:hover {
		background: color-mix(in oklch, var(--backgroundColor) 80%, black 20%);
	}

	.modalTitle {
		margin: 0 0 0.5rem 0;
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		text-transform: none;
		letter-spacing: 0.02em;
	}

	.modalRole {
		display: block;
		margin-bottom: 1.5rem;
		font-size: clamp(1rem, 2vw, 1.25rem);
		color: var(--accentColor);
	}

	.modalDescription {
		margin-bottom: 2rem;
		line-height: 1.75;
	}

	.modalDescription p {
		margin: 0 0 1rem 0;
	}

	.modalDescription p:last-child {
		margin-bottom: 0;
	}

	.modalEmail {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: var(--accentColor);
		color: var(--backgroundColor);
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}

	.modalEmail:hover {
		background: color-mix(in oklch, var(--accentColor) 90%, black 10%);
		transform: translateY(-2px);
	}

	.leaderModalHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.modalCardImage {
		max-width: 200px;
		aspect-ratio: 1/1;
		width: 100%;
	}

	.cardGridSimpleTitle {
		font-size: clamp(1rem, 0.5vw + 2rem, 2rem);
	}
	.cardGridSimple {
		grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
	}
</style>
