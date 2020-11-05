'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert("Posts", [
     { imageUrl: "http://www.honeybeehaven.org/wp-content/uploads/2013/10/resource-bees-101.jpg",
       content: 'Family owned farm since 1903! Offering apples, kale, squash and a wide assortment of berries (seasonal). Pick your own apples available on request!',
       announcements: "Akron Farmers Market: October 5th and 6th\
       We ship anywhere in the US!\
       Now selling honey crisp!",
       userId: 1,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       imageUrl: "http://www.honeybeehaven.org/wp-content/uploads/2013/10/resource-bees-101.jpg",
       content: 'Rivulet Apiaries & Hindu Hillbilly Farms is a small family owned and operated apiary nestled in the Rocky Mountains of western Ohio.',
       announcements: "Akron Farmers Market: October 5th and 6th\
       Now selling raspberries and blueberries",
       userId: 2,
       createdAt: new Date(),
       updatedAt: new Date()
     },
    {
       imageUrl: "http://www.honeybeehaven.org/wp-content/uploads/2013/10/resource-bees-101.jpg",
       content: 'Rivulet Apiaries & Hindu Hillbilly Farms is a small family owned and operated apiary nestled in the Rocky Mountains of western Ohio.',
       announcements: "Akron Farmers Market: October 5th and 6th\
       Now selling raspberries and blueberries",
       userId: 2,
       createdAt: new Date(),
       updatedAt: new Date()
     },
   ],{ })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete("Posts", null, {})
  }
};
