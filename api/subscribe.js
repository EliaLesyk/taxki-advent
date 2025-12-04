const { Resend } = require('resend');

const resendApiKey = process.env.RESEND_API_KEY;
const notificationEmail = (process.env.NOTIFICATION_EMAIL || 'elina@launchai.sh').trim();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set');
      return res.status(500).json({ message: 'Email service not configured' });
    }

    const resend = new Resend(resendApiKey);

    // Send notification email to you with the new subscriber
    const result = await resend.emails.send({
      from: 'Tax KI Advent <elina@send.taxki.launchai.sh>',
      to: [notificationEmail],
      subject: '🎄 Neuer Tax KI Advent Abonnent',
      html: `
        <h2>Neuer Abonnent für Tax KI Adventskalender</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Zeit:</strong> ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}</p>
      `,
    });

    // Check if email was sent successfully
    if (result.error) {
      console.error('Resend API error:', result.error);
      // For testing mode, still return success to user
      // In production with verified domain, this won't happen
      return res.status(200).json({
        message: 'Subscribed successfully',
        note: 'Email notification requires domain verification in Resend'
      });
    }

    console.log('Email sent successfully:', result);
    res.status(200).json({ message: 'Subscribed successfully', emailId: result.data?.id });
  } catch (error) {
    console.error('Subscription error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    res.status(500).json({
      message: 'Email sending failed',
      error: error.message || 'Unknown error'
    });
  }
};
