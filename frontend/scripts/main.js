document.addEventListener('DOMContentLoaded', function () {
  // Sidebar Toggle for Mobile Devices
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');

  if (hamburgerMenu && sidebar) {
    hamburgerMenu.addEventListener('click', function () {
      sidebar.classList.toggle('active');
      mainContent.classList.toggle('sidebar-active');
    });
  }

  // Close Sidebar When Clicking Outside
  document.addEventListener('click', function (event) {
    if (
      !sidebar.contains(event.target) &&
      !hamburgerMenu.contains(event.target) &&
      sidebar.classList.contains('active')
    ) {
      sidebar.classList.remove('active');
      mainContent.classList.remove('sidebar-active');
    }
  });

  // Nested Menu Items in Sidebar
  const nestedLinks = document.querySelectorAll('.sidebar a');
  nestedLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      if (link.nextElementSibling && link.nextElementSibling.classList.contains('nested')) {
        event.preventDefault();
        link.parentElement.classList.toggle('active');
      }
    });
  });

  // Search Functionality
  const searchInput = document.getElementById('search-input');
  const searchButton = document.querySelector('.search-bar button');
  const navLinks = document.querySelectorAll('.nav-links a, .sidebar a');

  searchButton.addEventListener('click', function () {
    const query = searchInput.value.toLowerCase();
    navLinks.forEach((link) => {
      if (link.textContent.toLowerCase().includes(query)) {
        link.style.display = 'block';
      } else {
        link.style.display = 'none';
      }
    });
  });

  // Load Posts Dynamically
  function loadPosts() {
    fetch('/posts')
      .then((response) => response.json())
      .then((posts) => {
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '';
        posts.forEach((post) => {
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
      .catch((error) => console.error('Error:', error));
  }

  window.onload = loadPosts;

  // Handle Form Submissions
  const newPostForm = document.getElementById('new-post-form');
  if (newPostForm) {
    newPostForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const location = document.getElementById('location').value;
      const postContent = document.getElementById('post-content').value;

      fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, location, content: postContent }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            loadPosts();
            newPostForm.reset();
          }
        })
        .catch((error) => console.error('Error:', error));
    });
  }
});