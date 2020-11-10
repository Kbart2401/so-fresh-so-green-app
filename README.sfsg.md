<img src="./stylesheets/logo.mockup.png" alt="Logo of the project" align="right">

# What's So Fresh, So Green?
So Fresh, So Green is a platform for farmers, growers and vendors alike to easily network with each other! Once you're all registered, as a user you have the ability to make posts relevant to your business including making announcements. You are also able to like and reply to a post thanks to our upvote & comment implementation, which will help fellow users engage with more people than they ever could locally! Some more notable features are the search bar and profile page, which tracks the user's activity as well as liked posts. So Fresh, So Green was inspired by Product Hunt. 



## Installing / Getting started

Initial landing page shows current Farm Feed. Comments aren't visible before Sign Up/Sign In

Signing-in:
    1) Click the 'Sign Up' button in the upper left.
    2) Create a new user (email must be unique and
    password must be 8 characters long.)
    3) Click submit

## Developing

### What Technologies Did You Use?


### Prerequisites
npm install, local database creation


### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/Kbart2401/so-fresh-so-green-app
cd so-fresh-so-green-app/
npm install
```



### Link to live site:

https://so-fresh-so-green.herokuapp.com/



### Link to wiki docs:

https://github.com/Kbart2401/so-fresh-so-green-app.wiki.git

## Features we are proud of:

1) JS generated comments with some added eye-catching divs and emojis:

commentListItem.innerHTML = `
<div class="circleDiv"></div>
<div class="commentUser">${comment.User.name}
<div class=fancyCommentFav>⇝</div></div>
<div class="comment">${comment.content}</div>`;


## Challenges we faced and resolutions we found.

1) We found time estimates difficult to accurately gauge. Something that sounded quick and easy could become a real time consummer: For example, using the createdAt timestamp to diplay the date that a post was submitted. We realized that it returns a large json object which can't easily be parsed and manipulated. The work-around we found was the JSON.stringify method followed by some good-old slicing. The createdAt data can't be overwtitten so we attached it via post.newDate:

    posts.map((post) => {
      let announcements = post.announcements.split("\n");
      post.announcements = announcements;
      //prep date for display
      let newDate = JSON.stringify(post.createdAt).slice(1, 11);
      newDate = newDate.slice(5, 7) + '/' + newDate.slice(8) + '/' + newDate.slice(0, 4);
      post.newDate = newDate;
      return post;
