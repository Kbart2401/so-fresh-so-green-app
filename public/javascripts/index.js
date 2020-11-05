// const comment = require("../../db/models/comment");

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
            if (!classes.includes('hidden')) {
                navLinks.classList.add('hidden')
                return;
            }
        })

    document.getElementById('exit')
        .addEventListener('click', e => {
            document.querySelector('.error-container').classList.add('hidden');
        });

        const commentSubmit = document.querySelectorAll('.commentSubmit');
        commentSubmit.forEach((comment) => {
            comment.addEventListener('click', e => {
                e.preventDefault();
                const formField = document.getElementById(`comment${e.target.value}`)
                await fetch('/posts/:id/comment', {
                    method: "POST",
                    body: {
                        content: formField.value
                    }
                })
            })
        })



})
