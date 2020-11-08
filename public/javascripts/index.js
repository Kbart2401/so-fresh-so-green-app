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

    const commentSubmit = document.querySelectorAll('.commentSubmit');
    //create comment and fetch comments
    commentSubmit.forEach((comment) => {
        comment.addEventListener('click', async e => {
            e.preventDefault();
            const postId = e.target.value.split('t')[1];
            const commentList = document.querySelector(`.commentList${postId}`);
            console.log('send it!')
            if(commentList.classList.contains("commentListHidden")) {
                commentList.classList.remove("commentListHidden")
            }
                const formField = document.getElementById(`comment${postId}`)
                const res = await fetch(`/posts/${postId}/comments`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: formField.value })
                })
                const comments = await res.json();
                const userId = comments.userId;
                const number = document.getElementById(`viewComments${postId}`)
                formField.value = ""
                number.innerHTML = comments.comments.length


                    commentList.innerHTML = ""
                    comments.comments.forEach((comment) => {
                        let commentListItem = document.createElement('div');
                        let deleteCommentButton = document.createElement('button')
                        deleteCommentButton.innerHTML = 'Delete';
                        commentListItem.setAttribute('class', 'commentBox');
                        deleteCommentButton.setAttribute('class', 'deleteCommentButton');
                        deleteCommentButton.setAttribute('value', comment.id);

                        commentList.appendChild(commentListItem);
                        commentListItem.innerHTML = comment.content;
                        if (userId === comment.userId) {
                            commentListItem.appendChild(deleteCommentButton);

                        }
                    })


        })
    })

  
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
    document.querySelectorAll('.commentsDiv')
        .forEach((button => {
            button.addEventListener("click", async (e) => {
                console.log(e.target.value)
                if(e.target.classList.contains("newComment")) {
                    console.log("comment")
                    return
                }
                if (!e.target.value || e.target.value.startsWith('post')) {
                    console.log("hey there")
                    return
                }
                const res = await fetch(`/comments/${e.target.value}`, {
                    method: "DELETE",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id: e.target.value})
                })
                const postId = await res.json();
                const commentFetch = await fetch(`/posts/${postId.postId}/comments`)
                const comments = await commentFetch.json();

                const number = document.getElementById(`viewComments${postId.postId}`)
                number.innerHTML = comments.comments.length
                

                    const userId = comments.userId;
                    const commentList = document.querySelector(`.commentList${postId.postId}`);
                    commentList.innerHTML = ""
                    comments.comments.forEach((comment) => {
                        let commentListItem = document.createElement('div');
                        let deleteCommentButton = document.createElement('button')
                        deleteCommentButton.innerHTML = 'Delete';
                        commentListItem.setAttribute('class', 'commentBox');
                        deleteCommentButton.setAttribute('class', 'deleteCommentButton');
                        deleteCommentButton.setAttribute('value', comment.id);
                        commentList.appendChild(commentListItem);
                        commentListItem.innerHTML = comment.content;
                        if (userId === comment.userId) {
                            commentListItem.appendChild(deleteCommentButton);

                        }
                    })

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

                    const userId = comments.userId;

                    commentList.innerHTML = ""
                    comments.comments.forEach((comment) => {
                        let commentListItem = document.createElement('div');
                        let deleteCommentButton = document.createElement('button')
                        deleteCommentButton.innerHTML = 'Delete';
                        commentListItem.setAttribute('class', 'commentBox');
                        deleteCommentButton.setAttribute('class', 'deleteCommentButton');
                        deleteCommentButton.setAttribute('value', comment.id);
                        commentList.appendChild(commentListItem);
                        commentListItem.innerHTML = comment.content;
                        if (userId === comment.userId) {
                            commentListItem.appendChild(deleteCommentButton);

                        }
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
