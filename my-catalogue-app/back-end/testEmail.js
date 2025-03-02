const sendEmail = require('./utils/sendEmail'); // Adjust the path as needed
require('dotenv').config(); // Load environment variables

sendEmail({
  to: 'recipient@example.com', // Replace with a valid email address
  subject: 'Test Email',
  text: 'This is a test email.',
})
  .then(() => console.log('Email sent successfully'))
  .catch((err) => console.error('Error sending email:', err));