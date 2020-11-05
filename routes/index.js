var express = require('express');
var router = express.Router();
const { User, Post } = require('../db/models')
const { asyncHandler } = require('../utils')
const { restoreUser } = require("../auth")

// posts = [
//   {
//   name: 'Kensington Family Farms',
//   city: 'Gold Bar, Ohio',
//   image: 'https://media.istockphoto.com/photos/summer-sunset-with-a-red-barn-in-rural-montana-and-rocky-mountains-picture-id863542630?k=6&m=863542630&s=612x612&w=0&h=dpYL6Ipp9q3G5iFu879LVeTpskgBhsyZtI1qp6xJxgw=',
//   upvotes: 155,
//   announcements: [
//       'Akron Farmers Market: October 5th and 6th',
//       'Now selling raspberries and blueberries!'
//   ],
//   comments: 21,
//   description: 'Family owned farm since 1903! Offering apples, kale, squash and a wide assortment of berries (seasonal). Pick your own apples available on request!',
//   email: 'kennsingtonFF@gmail.com'
// },
//   {
//       name: 'Hindu Hillbilly Honey',
//       city: 'Leavanworth, Ohio',
//       image: 'http://www.honeybeehaven.org/wp-content/uploads/2013/10/resource-bees-101.jpg',
//       upvotes: 17,
//       announcements: [
//           'Akron Farmers Market: October 5th and 6th',
//           'Now selling honey crisp!',
//           'We ship anywhere in the US!'
//       ],
//       comments: 3,
//       description: 'Rivulet Apiaries & Hindu Hillbilly Farms is a small family owned and operated apiary nestled in the Rocky Mountains of western Ohio.',
//       email: 'hinduHoney1987@hotmail.com'
//   },
//   {
//       name: 'Hindu Hillbilly Honey',
//       city: 'Leavanworth, Ohio',
//       image: 'http://www.honeybeehaven.org/wp-content/uploads/2013/10/resource-bees-101.jpg',
//       upvotes: 17,
//       announcements: [
//           'Akron Farmers Market: October 5th and 6th',
//           'Now selling honey crisp!',
//           'We ship anywhere in the US!'
//       ],
//       comments: 3,
//       description: 'Rivulet Apiaries & Hindu Hillbilly Farms is a small family owned and operated apiary nestled in the Rocky Mountains of western Ohio.',
//       email: 'hinduHoney1987@hotmail.com'
//   },
//   {
//       name: 'Hindu Hillbilly Honey',
//       city: 'Leavanworth, Ohio',
//       image: 'http://www.honeybeehaven.org/wp-content/uploads/2013/10/resource-bees-101.jpg',
//       upvotes: 17,
//       announcements: [
//           'Akron Farmers Market: October 5th and 6th',
//           'Now selling honey crisp!',
//           'We ship anywhere in the US!'
//       ],
//       comments: 3,
//       description: 'Rivulet Apiaries & Hindu Hillbilly Farms is a small family owned and operated apiary nestled in the Rocky Mountains of western Ohio.',
//       email: 'hinduHoney1987@hotmail.com'
//   }
// ]

/* GET home page. */
router.get('/', restoreUser, asyncHandler( async function(req, res, next) {
  let user;
  if (res.locals.authenticated) {
    user = await User.findByPk(req.session.auth.userId)
  }
  const posts = await Post.findAll({include: User, limit: 10, order: [["createdAt", 'DESC']] })
  posts.map( post => {
    let announcements = post.announcements.split("\n")
    post.announcements = announcements
    console.log("post",post)
    return post
  });
  // console.log("posts", posts)
  res.render('index', { title: 'Farm Feed!!!', user, posts});
}));

module.exports = router;
