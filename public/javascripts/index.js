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


    const commentSubmit = document.querySelectorAll('.commentSubmit');
    //create comment and fetch comments
    commentSubmit.forEach((comment) => {
        comment.addEventListener('click', async e => {
            e.preventDefault();
            const commentList = document.querySelector(`.commentList${e.target.value}`);
            if(commentList.classList.contains("commentListHidden")) {
                commentList.classList.remove("commentListHidden")
                const formField = document.getElementById(`comment${e.target.value}`)
                const res = await fetch(`/posts/${e.target.value}/comments`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: formField.value })
                })
                const comments = await res.json()
    
                    commentList.innerHTML = ""
                    comments.comments.forEach((comment) => {
                        let commentListItem = document.createElement('div');
                        commentListItem.setAttribute('class', 'commentBox')
                        commentListItem.innerHTML = comment.content;
                        commentList.appendChild(commentListItem);
    
                    })

            }
            
        })
    })

    // document.getElementById('your-activity')
    //     .addEventListener('click', async e => {
    //         const yourActivity = document.querySelector('.your-activity-container');
    //         if (!yourActivity.style.display) {
    //             yourActivity.style.display = 'none';
    //         } else {
    //             yourActivity.style.display = ''
    //         }
    //     })


    document.querySelectorAll('.upvoteDiv')
        .forEach((upvoteDiv) => {
            if(!upvoteDiv.classList.contains("downvoteDiv")){
                upvoteDiv.addEventListener('click', async (e) => {
                    const res = await fetch(`/posts/${e.target.value}/upvote`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    const upvotes = await res.json();
                    upvoteDiv.innerHTML = upvotes.upvotes;
                    upvoteDiv.classList.add("downvoteDiv")
                })

            }
        })
    //delete a comment
    document.querySelectorAll('.deleteCommentButton')
        .forEach((button => {
            button.addEventListener("click", async (e) => {
                const res = await fetch(`/comments/${commentId}`, {
                    method: "DELETE"
                })
                await res.json();
            })
        }))

    //fetch comments
    document.querySelectorAll('.viewCommentsButton')
        .forEach((button => {
            button.addEventListener("click", async (e) => {
                const commentList = document.querySelector(`.commentList${e.target.value}`);
                if(commentList.classList.contains("commentListHidden")) {
                    commentList.classList.remove("commentListHidden")
                    const res = await fetch(`/posts/${e.target.value}/comments`)
                    const comments = await res.json();
    
                        commentList.innerHTML = ""
                        comments.comments.forEach((comment) => {
                            let commentListItem = document.createElement('div');
                            commentListItem.setAttribute('class', 'commentBox')
                            commentListItem.innerHTML = comment.content;
                            commentList.appendChild(commentListItem);
    
                        })

                } else {
                    commentList.classList.add("commentListHidden")
                }
                

            })
        }))

    //delete an upvote and fetch upvote total
    document.querySelectorAll('.upvoteDiv')
        .forEach((upvoteDiv) => {
            // console.log(upvoteDiv.classList.contains("downvoteDiv"))
            upvoteDiv.addEventListener('click', async (e) => {
                if(upvoteDiv.classList.contains("downvoteDiv")) {
                    const res = await fetch(`/posts/${e.target.value}/downvote`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        // body: {
                        //     //need to send upvote id along somehow
                        // }
                    })
                    const upvotes = await res.json();
                    upvoteDiv.innerHTML = upvotes.upvotes;
                    upvoteDiv.classList.remove("downvoteDiv")
                }
    
                })
        })
})
