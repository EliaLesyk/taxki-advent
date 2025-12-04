const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const supabaseUrl = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
const resendApiKey = process.env.RESEND_API_KEY || 'YOUR_RESEND_API_KEY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const resend = new Resend(resendApiKey);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // 1. Store the email in Supabase
    const { error: supabaseError } = await supabase
      .from('subscribers')
      .insert([{ email }]);

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      // Don't block the user if Supabase fails, but log the error
    }

    // 2. Send a notification email
    try {
      await resend.emails.send({
        from: 'Advent Calendar <onboarding@resend.dev>',
        to: ['elina@launchai.sh'],
        subject: 'New Subscriber for Tax KI Advent Calendar',
        html: `<p>A new user has subscribed with the email: <strong>${email}</strong></p>`,
      });
    } catch (emailError) {
      console.error('Resend error:', emailError);
      // Also don't block on email failure, but log it
    }

    res.status(200).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
