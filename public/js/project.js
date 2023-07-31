const projectHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const description = document.querySelector('#project-description').value.trim();
  
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

const showProjectHandler = async (event) => {
  event.preventDefault();

  const button = document.querySelector('#show-project-form')
  const form = document.querySelector('#project-form')
  
  button.classList.add("w3-hide")

  form.classList.remove("w3-hide")

};

const hideProjectHandler = async (event) => {
  event.preventDefault();

  const button = document.querySelector('#show-project-form')
  const form = document.querySelector('#project-form')

  button.classList.remove("w3-hide")

  form.classList.add("w3-hide")

};

const deleteProjectHandler = async (event) => {
  event.preventDefault();

  const btn = event.currentTarget
  const id = btn.dataset.projectId
  
  if (id) {
    const response = await fetch('/api/projects', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Post failed to register.');
    }
  }
};

document.querySelector('#project-form').addEventListener('submit', projectHandler);
document.querySelector('#show-project-form').addEventListener('click', showProjectHandler);
document.querySelector('#hide-project-form').addEventListener('click', hideProjectHandler);