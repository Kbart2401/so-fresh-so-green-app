<img src="./stylesheets/logo.mockup.png" alt="Logo of the project" align="right">

# Name of the project: So Fresh So Green
 Online forum for farmers and gardeners. Users can post announcements, descriptions of farms etc and other users can then upvote and comment on existing posts. Site features a search bar
 and a user's profile page.



## Installing / Getting started

Initial landing page shows current Farm Feed. Comments aren't visible before Sign Up/Sign In

Signing-in:
    1) Click the 'Sign Up' button in the upper left.
    2) Create a new user (email must be unique and
    password must be 8 characters long.)
    3) Click submit

## Developing

### Built With

Javascript, Express, Jade templates, Vanilla CSS

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
