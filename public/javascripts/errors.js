window.addEventListener('DOMContentLoaded', () => {

  document.getElementById('exit')
        .addEventListener('click', e => {
            document.querySelector('.error-container').classList.add('hidden');
            document.querySelector('.screen-blur').classList.add('hidden');
        });
})