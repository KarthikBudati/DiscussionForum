const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Dummy data storage
let users = [];
let posts = [];

// Email and OTP generation
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Email sending configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // replace with your email
    pass: 'your-email-password'   // replace with your email password
  }
});

// Routes
app.post('/signup', (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();

  // Save user data and send OTP
  users.push({ email, otp });
  transporter.sendMail({
    from: 'your-email@gmail.com', // replace with your email
    to: email,
    subject: 'Verification OTP for Discussion Forum',
    text: `Your OTP is ${otp}`
  }, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });

  res.send('OTP sent for verification');
});

app.post('/verify', (req, res) => {
  const { email, otp } = req.body;

  // Check if the provided OTP is correct
  const user = users.find(u => u.email === email && u.otp === parseInt(otp, 10));

  if (user) {
    res.send('Verification successful');
  } else {
    res.status(401).send('Invalid OTP');
  }
});

app.post('/create-post', (req, res) => {
  const { username, text } = req.body;

  // Save post
  posts.push({ username, text, comments: [] });

  res.send('Post created successfully');
});

app.post('/add-comment', (req, res) => {
  const { postId, username, text } = req.body;

  // Save comment
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.comments.push({ username, text });
    res.send('Comment added successfully');
  } else {
    res.status(404).send('Post not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
