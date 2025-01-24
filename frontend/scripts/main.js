document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
  
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
      });
    }
  });

document.getElementById('new-post-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const location = document.getElementById('location').value;
  const postContent = document.getElementById('post-content').value;

  fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, location, content: postContent })
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
    } else {
      loadPosts();
      document.getElementById('new-post-form').reset();
    }
  })
  .catch(error => console.error('Error:', error));
});

document.getElementById('registration-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // Send registration data to the backend
});

// Function to load posts from the backend
function loadPosts() {
  fetch('/posts')
    .then(response => response.json())
    .then(posts => {
      const postsContainer = document.getElementById('posts-container');
      postsContainer.innerHTML = '';
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <h3>${post.name} from ${post.location}</h3>
          <p>${post.content}</p>
          <small>${post.timestamp}</small>
        `;
        postsContainer.appendChild(postElement);
      });
    })
    .catch(error => console.error('Error:', error));
}

// Call loadPosts on page load
window.onload = loadPosts;
