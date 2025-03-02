const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Forgot password controller
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 600000; // 10 minutes
    await user.save();

    const resetUrl = `http://localhost:9000/reset-password/${resetToken}`;
    await sendEmail({
      to: user.email,
      subject: 'Password Reset',
      text: `Click the link to reset your password: ${resetUrl}`,
    });

    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Reset password controller
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) throw new Error('Invalid or expired token');

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { forgotPassword, resetPassword };