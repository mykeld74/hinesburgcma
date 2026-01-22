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
	const { name, email, phone, message, sendTo, checkboxes } = await request.json();

	// Normalize sendTo to an array of email addresses
	let recipientEmails: string[] = [];
	if (sendTo) {
		if (Array.isArray(sendTo)) {
			recipientEmails = sendTo;
		} else if (typeof sendTo === 'string') {
			// Handle comma-separated string
			recipientEmails = sendTo.split(',').map((email) => email.trim()).filter(Boolean);
		}
	}
	
	// Fallback to default if no valid recipients
	if (recipientEmails.length === 0) {
		recipientEmails = ['info@hinesburgcma.org'];
	}

	// Format checkboxes for email
	let checkboxesHtml = '';
	if (checkboxes && Array.isArray(checkboxes) && checkboxes.length > 0) {
		checkboxesHtml = `
			<tr>
				<td style="padding: 16px 20px; border-top: 1px solid #e0e0e0;">
					<p style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #333;">I'm interested in:</p>
					<ul style="margin: 0; padding-left: 24px; font-size: 15px; line-height: 1.6; color: #555;">
						${checkboxes.map((cb) => `<li style="margin-bottom: 8px;">${cb.label || cb.id}</li>`).join('')}
					</ul>
				</td>
			</tr>
		`;
	}

	try {
		await transporter.sendMail({
			from: `"CAC Web Inquiry" <${env.GOOGLE_EMAIL}>`,
			to: recipientEmails,
			subject: `Web Form Submission from ${name}`,
			html: `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<title>Web Form Submission</title>
				<!--[if mso]>
				<style type="text/css">
					table {border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;}
				</style>
				<![endif]-->
			</head>
			<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
				<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
					<tr>
						<td align="center" style="padding: 20px 10px;">
							<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
								<!-- Header -->
								<tr>
									<td style="padding: 32px 20px 24px 20px; background-color: #038bc7; border-radius: 8px 8px 0 0;">
										<h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #ffffff; text-align: center;">Web Form Submission</h1>
									</td>
								</tr>
								
								<!-- Name -->
								<tr>
									<td style="padding: 24px 20px 16px 20px;">
										<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
											<tr>
												<td style="padding-bottom: 8px; font-size: 13px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Name</td>
											</tr>
											<tr>
												<td style="font-size: 16px; color: #333; line-height: 1.5;">${name}</td>
											</tr>
										</table>
									</td>
								</tr>
								
								<!-- Email -->
								<tr>
									<td style="padding: 16px 20px; border-top: 1px solid #e0e0e0;">
										<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
											<tr>
												<td style="padding-bottom: 8px; font-size: 13px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
											</tr>
											<tr>
												<td style="font-size: 16px; line-height: 1.5;">
													<a href="mailto:${email}" style="color: #038bc7; text-decoration: none; word-break: break-all;">${email}</a>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								
								<!-- Phone -->
								<tr>
									<td style="padding: 16px 20px; border-top: 1px solid #e0e0e0;">
										<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
											<tr>
												<td style="padding-bottom: 8px; font-size: 13px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Phone</td>
											</tr>
											<tr>
												<td style="font-size: 16px; line-height: 1.5;">
													<a href="tel:${phone}" style="color: #038bc7; text-decoration: none;">${phone}</a>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								
								<!-- Message -->
								<tr>
									<td style="padding: 16px 20px; border-top: 1px solid #e0e0e0;">
										<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
											<tr>
												<td style="padding-bottom: 8px; font-size: 13px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Message</td>
											</tr>
											<tr>
												<td style="font-size: 16px; color: #333; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word;">${message}</td>
											</tr>
										</table>
									</td>
								</tr>
								
								${checkboxesHtml}
								
								<!-- Footer -->
								<tr>
									<td style="padding: 24px 20px; border-top: 1px solid #e0e0e0; background-color: #f9f9f9; border-radius: 0 0 8px 8px;">
										<p style="margin: 0; font-size: 12px; color: #999; text-align: center;">This email was sent from the CAC website contact form</p>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</body>
			</html>
			`
		});

		return json({ success: true });
	} catch (error) {
		console.error('Email error:', error);
		return json({ success: false, error: 'Failed to send email' }, { status: 500 });
	}
};
