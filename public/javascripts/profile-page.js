window.addEventListener('DOMContentLoaded', () => {

  document.getElementById('your-posts')
    .addEventListener('click', async e => {
      const yourPosts = document.querySelector('.your-posts-container');
      if (!yourPosts.style.display) {
        yourPosts.style.display = 'none';
      } else {
        yourPosts.style.display = ''
      }
    })
})