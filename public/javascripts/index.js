// const comment = require("../../db/models/comment");

window.addEventListener('DOMContentLoaded', () => {


    const commentSubmit = document.querySelectorAll('.commentSubmit');
    //create comment and fetch comments
    commentSubmit.forEach((comment) => {
        comment.addEventListener('click', async e => {
            e.preventDefault();
            const postId = e.target.value.split('t')[1];
            const commentList = document.querySelector(`.commentList${postId}`);
            console.log('send it!')
            if (commentList.classList.contains("commentListHidden")) {
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
                commentListItem.setAttribute('class', 'commentBox');

                commentList.appendChild(commentListItem);
                commentListItem.innerHTML = `<div class="circleDiv"></div><div class="commentUser">${comment.User.name}<div class=fancyCommentFav>⇝</div></div><div class="comment">${comment.content}</div>`;
                deleteCommentButton.setAttribute('class', 'deleteCommentButton');
                if (userId === comment.userId) {
                    commentListItem.innerHTML = `<div class="circleUserDiv"></div><div class="commentUser">${comment.User.name}<div class=fancyCommentFav>⇝</div></div><div class="comment">${comment.content}</div>`;
                    deleteCommentButton.innerHTML = 'delete';
                    deleteCommentButton.setAttribute('value', comment.id);

                }
                commentListItem.appendChild(deleteCommentButton);
            })


        })
    })


    document.querySelectorAll('.upvoteDiv')
        .forEach((upvoteDiv) => {
            if (!upvoteDiv.classList.contains("downvoteDiv")) {
                upvoteDiv.addEventListener('click', async (e) => {
                    const res = await fetch(`/posts/${e.target.value}/upvote`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    if (res.ok) {
                        const upvotes = await res.json();
                        upvoteDiv.innerHTML = upvotes.upvotes;
                        upvoteDiv.classList.add("downvoteDiv")
                    }
                    else {
                        if (!document.querySelector('.screen-blur')) {
                            let screenBlur = document.createElement('div')
                            screenBlur.classList.add('screen-blur')
                            let body = document.querySelector('body')
                            body.appendChild(screenBlur)
                            let errorContainer = document.createElement('div')
                            errorContainer.classList.add('error-container')
                            errorContainer.setAttribute('id', 'error-container')
                            body.appendChild(errorContainer)
                            errorContainer.innerHTML = `<div id="exit">x</div>
                            <div class="errorlist" style="color: darkred; text-align: center">Please log in to upvote posts</div>`
                        }
                        else {
                            document.querySelector('.screen-blur').classList.remove('hidden')
                            document.querySelector('.error-container').classList.remove('hidden')
                        }
                        document.getElementById('exit')
                            .addEventListener('click', e => {
                                document.querySelector('.error-container').classList.add('hidden');
                                document.querySelector('.screen-blur').classList.add('hidden');
                            });
                    }
                })

            }
        })



    //delete a comment
    document.querySelectorAll('.commentsDiv')
        .forEach((button => {
            button.addEventListener("click", async (e) => {
                console.log(e.target.value)
                if (e.target.classList.contains("newComment")) {
                    console.log("comment")
                    return
                }
                if (!e.target.value || e.target.value.startsWith('post')) {
                    console.log("hey there")
                    return
                }
                const res = await fetch(`/comments/${e.target.value}`, {
                    method: "DELETE",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: e.target.value })
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
                    commentListItem.setAttribute('class', 'commentBox');
                    commentList.appendChild(commentListItem);
                    commentListItem.innerHTML = `<div class="circleDiv"></div><div class="commentUser">${comment.User.name}<div class=fancyCommentFav>⇝</div></div><div class="comment">${comment.content}</div>`;
                    deleteCommentButton.setAttribute('class', 'deleteCommentButton');
                    if (userId === comment.userId) {
                        commentListItem.innerHTML = `<div class="circleUserDiv"></div><div class="commentUser">${comment.User.name}<div class=fancyCommentFav>⇝</div></div><div class="comment">${comment.content}</div>`;
                        deleteCommentButton.innerHTML = 'delete';
                        deleteCommentButton.setAttribute('value', comment.id);

                    }
                    commentListItem.appendChild(deleteCommentButton);
                })

            })
        }))

    //fetch comments
    document.querySelectorAll('.viewCommentsButton')
        .forEach((button => {
            button.addEventListener("click", async (e) => {
                const commentList = document.querySelector(`.commentList${e.target.value}`);
                if (commentList.classList.contains("commentListHidden")) {
                    commentList.classList.remove("commentListHidden")
                    const res = await fetch(`/posts/${e.target.value}/comments`)
                    const comments = await res.json();

                    const userId = comments.userId;

                    commentList.innerHTML = ""
                    comments.comments.forEach((comment) => {
                        let commentListItem = document.createElement('div');
                        let deleteCommentButton = document.createElement('button')
                        commentListItem.setAttribute('class', 'commentBox');

                        commentList.appendChild(commentListItem);
                        commentListItem.innerHTML = `<div class="circleDiv"></div><div class="commentUser">${comment.User.name}<div class=fancyCommentFav>⇝</div></div><div class="comment">${comment.content}</div>`;
                        deleteCommentButton.setAttribute('class', 'deleteCommentButton');
                        if (userId === comment.userId) {
                            commentListItem.innerHTML = `<div class="circleUserDiv"></div><div class="commentUser">${comment.User.name}<div class=fancyCommentFav>⇝</div></div><div class="comment">${comment.content}</div>`;
                            deleteCommentButton.innerHTML = 'delete';
                            deleteCommentButton.setAttribute('value', comment.id);

                        }
                        commentListItem.appendChild(deleteCommentButton);
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
                if (upvoteDiv.classList.contains("downvoteDiv")) {
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

    /******Demo User Login********/
    document.querySelector('.submitButton.demo')
        ?.addEventListener('click', async (e) => {
            e.preventDefault()
            await fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _csrf: e.target.value,
                    email: 'demo@aa.io',
                    password: 'password'
                })
            })
            location.reload()
        })
})
