const commentFormHandler = async (event) => {
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

const showCommentHandler = async (event) => {
  event.preventDefault();

  const button = document.querySelector('#show-comment-form')
  const form = document.querySelector('#comment-form')
  
  button.classList.add("w3-hide")

  form.classList.remove("w3-hide")

};

const hideCommentHandler = async (event) => {
  event.preventDefault();

  const button = document.querySelector('#show-comment-form')
  const form = document.querySelector('#comment-form')

  button.classList.remove("w3-hide")

  form.classList.add("w3-hide")

};

document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);
document.querySelector('#show-comment-form').addEventListener('click', showCommentHandler);
document.querySelector('#hide-comment-form').addEventListener('click', hideCommentHandler);