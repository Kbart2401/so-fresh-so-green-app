window.addEventListener('DOMContentLoaded', () => {
  const yourActivity = document.querySelector('.your-activity-container');
  const yourPosts = document.querySelector('.your-posts-container');

  document.getElementById('your-posts')
    .addEventListener('click', async e => {
      if (!yourActivity.style.display) {
        yourActivity.style.display = 'none';
        yourPosts.style.display = '';
      } 
    })
  document.getElementById('your-activity')
    .addEventListener('click', async e => {
      if (!yourPosts.style.display) {
        yourPosts.style.display = 'none';
        yourActivity.style.display = '';
      } 
    })
})