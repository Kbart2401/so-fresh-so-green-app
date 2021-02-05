<img src='./public/stylesheets/logomockup.png' style='background-color: #368a42; border-radius: 5px'/>
<br>
<h1 align='center'>So Fresh So Green Documentation</h1>
<div align='center'>Built with 
<br>
<img src="https://img.icons8.com/color/48/000000/javascript.png"/>
<img src="https://img.icons8.com/color/48/000000/css3.png"/>
<img src="https://img.icons8.com/color/48/000000/nodejs.png"/>
<img src="https://img.icons8.com/color/48/000000/postgreesql.png"/>
</div>
<div align='center'>By
<br>
<a href='https://www.linkedin.com/in/danielpong/'>Danny Pong</a>
<a href='https://www.linkedin.com/in/kyle-barthelmes-a5120b51/'>Kyle Barthelmes </a>
<a href='https://www.linkedin.com/in/maximos-salzman-5a7050171/'>Maximos Salzman</a>
<a href='https://www.linkedin.com/in/robin-scavo-0617881b5/'>Robin Scavo</a>
</div>
<br>
<div align='center' style='font-size: 25px'>
<a href='https://so-fresh-so-green.herokuapp.com/'>Live Link</a>
</div>
<br>

# What's So Fresh, So Green?
So Fresh, So Green is a platform for farmers, growers and vendors alike to easily network with each other! Once you're all registered, as a user you have the ability to make posts relevant to your business including making announcements. You are also able to like and reply to a post thanks to our upvote & comment implementation, which will help fellow users engage with more people than they ever could locally! Some more notable features are the search bar and profile page, which tracks the user's activity as well as liked posts. So Fresh, So Green was inspired by <a href='https://www.producthunt.com/'>Product Hunt</a>.



## Installing / Getting started

Initial landing page shows recent Farm Feed. 

Signing-in:
    1) Click the 'Sign Up' button in the upper left.
    2) Create a new user (email must be unique and
    password must be 8 characters long.)
    3) Click submit

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/Kbart2401/so-fresh-so-green-app
cd so-fresh-so-green-app/
npm install
```


### Link to wiki docs:

https://github.com/Kbart2401/so-fresh-so-green-app.wiki.git

## Features we are proud of:

1) JS generated comments with some added eye-catching divs and emojis:

commentListItem.innerHTML = `
<div class="circleDiv"></div>
<div class="commentUser">${comment.User.name}
<div class=fancyCommentFav>⇝</div></div>
<div class="comment">${comment.content}</div>`;

## Database Schema
![Screen Shot 2021-02-04 at 10 19 09 PM](https://user-images.githubusercontent.com/67812737/106985356-4f865d00-6737-11eb-936b-1b1c5495be10.png)
<br>

# Usage 
### Demo User
There is a **Demo** user that has access to all the features of the site for those briefly visiting the site and not wanting to sign-up.

## Contribution
If you would like to contribute to this project in any way, you may take the following steps
  1. Fork this repository
  2. Locally create a new branch `git checkout -b <new branch name>`
  3. Make updates and push branch up to repo `git push -u origin <new branch name>`
  4. Create a pull request
    - Please include clear details of changes 
  
  ### Reporting bugs
  Please report any bugs/issues you may find via opening an issue in this repo

  ## Development
  Follow these steps if you need guidance on setting up and running a local server for this project
  1. Clone or fork this repo
  2. `npm install` in the root directory to install dependencies
  3. Create a **.env** file in root directory and follow the format of the **.env.example** file 
  4. Create a postgresql database according to the environment variables created in your **.env** file
  5. Start your Express server with `npm start`
  - Server will be on **http://localhost:4000/**



## Challenges we faced and resolutions we found.

1) We found time estimates difficult to accurately gauge. Something that sounded quick and easy could become a real time consummer: For example, using the createdAt timestamp to diplay the date that a post was submitted. We realized that it returns a large json object which can't easily be parsed and manipulated. The work-around we found was the JSON.stringify method followed by some good-old slicing. The createdAt data can't be overwtitten so we attached it via post.newDate:

```javascript
    posts.map((post) => {
      let announcements = post.announcements.split("\n");
      post.announcements = announcements;
      //prep date for display
      let newDate = JSON.stringify(post.createdAt).slice(1, 11);
      newDate = newDate.slice(5, 7) + '/' + newDate.slice(8) + '/' + newDate.slice(0, 4);
      post.newDate = newDate;
      return post;
``` 
