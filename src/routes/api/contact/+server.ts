import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

const transporter = nodemailer.createTransport({
	host: env.MAIL_HOST,
	port: Number(env.MAIL_PORT),
	secure: false,
	auth: {
		user: env.GOOGLE_EMAIL,
		pass: env.GOOGLE_EMAIL_PASSWORD
	}
});

export const POST = async ({ request }) => {
	const { name, email, phone, message, sendTo } = await request.json();

	const recipientEmail = sendTo || 'info@hinesburgcma.org';

	try {
		await transporter.sendMail({
			from: `"CAC Web Inquiry" <${env.GOOGLE_EMAIL}>`,
			to: recipientEmail,
			subject: `Web Form Submission from ${name}`,
			html: `
			<body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; font-size: 18px;">
				<h2 style="color: #038bc7; font-size: 24px; font-weight: 600; text-decoration: underline;">Web Form Submission</h2>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
				<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
				<p><strong>Message:</strong> ${message}</p>
			</body>
			`
		});

		return json({ success: true });
	} catch (error) {
		console.error('Email error:', error);
		return json({ success: false, error: 'Failed to send email' }, { status: 500 });
	}
};
