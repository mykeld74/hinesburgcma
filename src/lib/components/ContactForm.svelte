<script lang="ts">
	import IMask from 'imask';
	import { fade } from 'svelte/transition';

	interface CheckboxOption {
		id: string;
		label: string;
	}

	interface Props {
		endpoint?: string;
		sendTo?: string | string[];
		onSuccess?: () => void;
		checkboxes?: CheckboxOption[];
		resetKey?: number;
	}

	let {
		endpoint = '/api/contact',
		sendTo = 'info@hinesburgcma.org',
		onSuccess,
		checkboxes = [],
		resetKey = 0
	}: Props = $props();

	const maskConfig = { mask: '(000) 000-0000' };

	// Initialize checkbox state
	function initializeCheckboxes() {
		return checkboxes.reduce(
			(acc, cb) => {
				acc[cb.id] = false;
				return acc;
			},
			{} as Record<string, boolean>
		);
	}

	let formData = $state({
		name: '',
		email: '',
		phone: '',
		message: '',
		checkboxes: initializeCheckboxes()
	});

	let status = $state({
		sending: false,
		success: false,
		error: null as string | null
	});

	let formIsValid = $state(false);
	let errors = $state({
		name: '',
		email: '',
		phone: '',
		message: ''
	});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		const emailTest = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,6}$/;

		formIsValid = true;

		if (formData.name.length < 2) {
			formIsValid = false;
			errors.name = 'Please enter your name.';
		} else {
			errors.name = '';
		}

		if (emailTest.test(formData.email) === false) {
			formIsValid = false;
			errors.email = 'Please enter a valid email address.';
		} else {
			errors.email = '';
		}

		if (formData.message.length < 3) {
			formIsValid = false;
			errors.message = 'Please tell us how we can help you.';
		} else {
			errors.message = '';
		}

		if (formData.phone.length < 10) {
			formIsValid = false;
			errors.phone = 'Please enter a valid phone number.';
		} else {
			errors.phone = '';
		}

		if (!formIsValid) {
			return;
		}

		status.sending = true;
		status.error = null;

		try {
			// Map checkbox IDs to labels for email
			const checkboxData = checkboxes
				.filter((cb) => formData.checkboxes[cb.id])
				.map((cb) => ({ id: cb.id, label: cb.label }));

			const response = await fetch(endpoint, {
				method: 'POST',
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
					message: formData.message,
					checkboxes: checkboxData,
					sendTo
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const result = await response.json();

			if (result.success) {
				status.success = true;
				const resetCheckboxes = checkboxes.reduce(
					(acc, cb) => {
						acc[cb.id] = false;
						return acc;
					},
					{} as Record<string, boolean>
				);
				formData = { name: '', email: '', phone: '', message: '', checkboxes: resetCheckboxes };
				if (onSuccess) {
					onSuccess();
				}
			} else {
				status.error = result.error || 'Failed to send message';
			}
		} catch (error) {
			status.error = 'Failed to send message';
		} finally {
			status.sending = false;
		}
	}

	function handleInput(field: 'name' | 'email' | 'phone' | 'message') {
		errors[field] = '';
		formIsValid = true;
	}

	function resetForm() {
		const resetCheckboxes = initializeCheckboxes();
		formData = { name: '', email: '', phone: '', message: '', checkboxes: resetCheckboxes };
		status = { sending: false, success: false, error: null };
		errors = { name: '', email: '', phone: '', message: '' };
		formIsValid = false;
	}

	// Reset form when resetKey changes
	$effect(() => {
		if (resetKey > 0) {
			resetForm();
		}
	});
</script>

<div class="contactContainer">
	{#if status.success}
		<div class="successMessage">
			<h2>Thank you!</h2>
			<p>Your message has been sent. We'll be in touch soon.</p>
		</div>
	{:else}
		<form class="contactForm" onsubmit={handleSubmit}>
			<div class="formGroup">
				<label for="name">Name</label>
				<input
					type="text"
					id="name"
					bind:value={formData.name}
					oninput={() => handleInput('name')}
					required
				/>
				{#if errors.name}
					<div class="errorMessage" transition:fade>{errors.name}</div>
				{/if}
			</div>

			<div class="formGroup">
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
					bind:value={formData.email}
					oninput={() => handleInput('email')}
					required
				/>
				{#if errors.email}
					<div class="errorMessage" transition:fade>{errors.email}</div>
				{/if}
			</div>

			<div class="formGroup">
				<label for="phone">Phone</label>
				<input
					use:IMask={maskConfig}
					type="tel"
					id="phone"
					bind:value={formData.phone}
					oninput={() => handleInput('phone')}
					required
				/>
				{#if errors.phone}
					<div class="errorMessage" transition:fade>{errors.phone}</div>
				{/if}
			</div>

			<div class="formGroup">
				<label for="message">Message</label>
				<textarea
					id="message"
					bind:value={formData.message}
					oninput={() => handleInput('message')}
					rows="6"
					required
				></textarea>
				{#if errors.message}
					<div class="errorMessage" transition:fade>{errors.message}</div>
				{/if}
			</div>

			{#if checkboxes.length > 0}
				<div class="formGroup checkboxGroup">
					<fieldset class="checkboxFieldset">
						<legend class="checkboxLegend">I'm interested in:</legend>
						<div class="checkboxContainer">
							{#each checkboxes as checkbox}
								<label class="checkboxLabel">
									<input
										type="checkbox"
										bind:checked={formData.checkboxes[checkbox.id]}
										value={checkbox.id}
										class="checkboxInput"
									/>
									<span class="checkboxText">{checkbox.label}</span>
								</label>
							{/each}
						</div>
					</fieldset>
				</div>
			{/if}

			<button class="submitButton" type="submit" disabled={status.sending}>
				{status.sending ? 'Sending...' : 'Send Message'}
			</button>

			{#if status.error}
				<div class="errorMessage" transition:fade>{status.error}</div>
			{/if}
		</form>
	{/if}
</div>

<style>
	.contactContainer {
		width: 100%;
		margin: 0 auto;
		padding: 0;
		background: color-mix(in oklch, var(--surfaceColor) 88%, black 12%);
		border: 1px solid color-mix(in oklch, var(--primaryColor) 40%, transparent);
		border-radius: 20px;
		box-shadow:
			inset 0 0 0 1px color-mix(in oklch, var(--contrastColor) 6%, transparent),
			0 16px 24px color-mix(in oklch, black 35%, transparent);
	}

	.contactForm {
		background: var(--cardBackground);
		padding: 2rem 1rem;
		border-radius: 0.5rem;
		box-shadow: 0 4px 20px var(--overlayColor);
		border: 1px solid var(--cardBorder);
	}

	.formGroup {
		margin-bottom: 1.5rem;
	}

	.formGroup label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: var(--textColor);
		font-size: 1.1rem;
		&.checkboxLabel {
			display: grid;
			grid-template-columns: 1.25rem 1fr;
			align-items: center;
			gap: 0.75rem;
			cursor: pointer;
			font-size: 1rem;
			color: var(--textColor);
		}
	}

	.formGroup input,
	.formGroup textarea {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 1px solid var(--cardBorder);
		border-radius: 0.5rem;
		font-size: 1rem;
		font-family: inherit;
		background: var(--backgroundColor);
		color: var(--textColor);
		transition: border-color 0.3s ease;
	}

	.formGroup input:focus,
	.formGroup textarea:focus {
		outline: none;
		border-color: var(--primaryColor);
	}

	.formGroup textarea {
		resize: vertical;
		min-height: 120px;
	}

	.submitButton {
		width: 100%;
		padding: 1rem 2rem;
		border-radius: 0.5rem;
		background: var(--accentColor);
		color: var(--backgroundColor);
		border: none;
		cursor: pointer;
		font-size: 1.25rem;
		font-weight: 600;
		transition: all 0.3s ease-in-out;
		margin-top: 1rem;
	}

	.submitButton:hover:not(:disabled) {
		background: color-mix(in oklch, var(--accentColor) 80%, #fff);
		transform: scale(1.02);
	}

	.submitButton:disabled {
		background: var(--secondaryColor);
		color: var(--textColor);
		cursor: not-allowed;
		transform: none;
	}

	.errorMessage {
		color: #d32f2f;
		background: rgba(211, 47, 47, 0.1);
		padding: 0.75rem;
		border-radius: 0.5rem;
		margin-top: 0.5rem;
		border: 1px solid #f44336;
		font-size: 0.9rem;
	}

	.successMessage {
		background: var(--cardBackground);
		padding: 2rem;
		border-radius: 0.5rem;
		text-align: center;
		border: 1px solid var(--primaryColor);
		box-shadow: 0 4px 20px var(--overlayColor);
	}

	.successMessage h2 {
		color: var(--titleColor);
		margin-bottom: 1rem;
		font-size: 1.5rem;
	}

	.successMessage p {
		color: var(--textColor);
		font-size: 1.1rem;
		margin: 0;
	}

	.checkboxGroup {
		margin-top: 1.5rem;
	}

	.checkboxFieldset {
		border: 1px solid var(--cardBorder);
		border-radius: 0.5rem;
		padding: 1rem;
		margin: 0;
	}

	.checkboxLegend {
		font-weight: 600;
		color: var(--textColor);
		font-size: 1.3rem;
		margin-bottom: 0;
	}

	.checkboxContainer {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.checkboxInput {
		width: 1.25rem;
		height: 1.25rem;
		cursor: pointer;
		accent-color: var(--accentColor);
	}

	.checkboxText {
		user-select: none;
	}
</style>
