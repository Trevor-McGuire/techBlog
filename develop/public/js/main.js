

const loginFormHandler = async (event) => { console.log("loginFormHandler() ran")
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};
const commentFormHandler = async (event) => { console.log("commentFormHandler() ran")
  event.preventDefault();

  const text = document.querySelector('#comment-text').value.trim();

  if (text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({text}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Comment failed to register.');
    }
  }
};
const logoutHandler = async () => { console.log("logoutHandler() ran")
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};
const postHandler = async (event) => { console.log("postHandler() ran")
  event.preventDefault();

  const name = document.querySelector('#post-name').value.trim();
  const description = document.querySelector('#post-description').value.trim();
  
  if (!name) alert('Please add a Post Name.')
  if (!description) alert('Please add a Post Description.')

  if (name && description) {
    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Post failed to register.');
    }
  }
};
const signupFormHandler = async (event) => { console.log("signupFormHandler() ran")
  event.preventDefault();

  const name = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

var loginInput = document.querySelector('.login-form')
if (loginInput) loginInput.addEventListener('submit', loginFormHandler);

var commentInput = document.querySelector('.comment-form')
if (commentInput) commentInput.addEventListener('submit', commentFormHandler);

var logoutInput = document.querySelector('#logout')
if (logoutInput) logoutInput.addEventListener('click', logoutHandler);

var postInput = document.querySelector('.post-form')
if (postInput) postInput.addEventListener('submit', postHandler);

var signupInput = document.querySelector('.signup-form')
if (signupInput) signupInput.addEventListener('submit', signupFormHandler);