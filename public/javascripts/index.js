window.addEventListener('DOMContentLoaded', () => {

    /**********Show/Hide Nav Links under Profile Icon*******/
    document.querySelector('.welcomeDiv')
        .addEventListener('click', (e) => {
            const navLinks = document.querySelector('.nav-links')
            const classes = navLinks.getAttribute('class');
            if (classes.includes('hidden')) {
                navLinks.classList.remove('hidden')
                return;
            }
            if(!classes.includes('hidden')) {
                navLinks.classList.add('hidden')
                return;
            }
        })



})