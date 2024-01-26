// Front-end JavaScript for the discussion forum

async function sendOTP() {
    const email = document.getElementById('email').value;
  
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `email=${email}`
    });
  
    const result = await response.text();
    alert(result);
  
    // Show the OTP verification form
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('verifyForm').style.display = 'block';
  }
  
  async function verifyOTP() {
    const email = document.getElementById('email').value;
    const otp = document.getElementById('otp').value;
  
    const response = await fetch('/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `email=${email}&otp=${otp}`
    });
  
    const result = await response.text();
    alert(result);
  
    // Show the post creation form
    document.getElementById('verifyForm').style.display = 'none';
    document.getElementById('postForm').style.display = 'block';
  }
  
  async function createPost() {
    const username = document.getElementById('username').value;
    const postText = document.getElementById('postText').value;
  
    const response = await fetch('/create-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${username}&text=${postText}`
    });
  
    const result = await response.text();
    alert(result);
  
    // Reset the form
    document.getElementById('postForm').reset();
  }
  