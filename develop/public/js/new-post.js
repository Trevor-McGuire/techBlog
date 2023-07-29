const newPost = async (event) => {
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

document
  .querySelector('#new-post')
  .addEventListener('click', newPost);
