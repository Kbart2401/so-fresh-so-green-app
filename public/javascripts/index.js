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

    // document.getElementById('exit')
    //     .addEventListener('click', e => {
    //         document.querySelector('.error-container').classList.add('hidden');
    //     });

        console.log("hey")

        const commentSubmit = document.querySelectorAll('.commentSubmit');

        commentSubmit.forEach((comment) => {
            comment.addEventListener('click',async e => {
                e.preventDefault();
                const formField = document.getElementById(`comment${e.target.value}`)
                const res = await fetch(`/posts/${e.target.value}/comment`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({content: formField.value})
                })
                const comments = await res.json()
                console.log("comments", comments)
            })
        })



})
