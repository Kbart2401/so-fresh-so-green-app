window.addEventListener('DOMContentLoaded', () => {

  console.log('HELLO THERE')
  document.getElementById('exit')
        .addEventListener('click', e => {
            document.querySelector('.error-container').classList.add('hidden');
        });
})