import nodemailer from 'nodemailer';

class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const port = parseInt(process.env.MAIL_PORT || '2525', 10);
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
      port: port,
      secure: port === 465 || process.env.MAIL_ENCRYPTION === 'ssl', // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME || '',
        pass: process.env.MAIL_PASSWORD || '',
      },
    });
  }

  async sendInvitationEmail(to: string, workspaceName: string, role: string, token: string) {
    const mailOptions = {
      from: process.env.MAIL_USERNAME || 'noreply@contentbay.com',
      to,
      subject: `You have been invited to join ${workspaceName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2f54eb;">Welcome to ContentBay!</h2>
          <p>You have been invited to join the workspace <strong>${workspaceName}</strong> as a <strong>${role}</strong>.</p>
          <p>Click the link below to accept the invitation and access your new workspace:</p>
          <div style="margin: 30px 0;">
            <a href="http://localhost:5173/invite?token=${token}" style="background-color: #2f54eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Accept Invitation</a>
          </div>
          <p style="font-size: 12px; color: #888;">If you did not expect this invitation, you can safely ignore this email.</p>
        </div>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email: ', error);
      throw new Error('Failed to send invitation email');
    }
  }
}

export default new MailerService();
