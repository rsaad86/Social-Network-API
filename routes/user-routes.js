const router = require("express").Router();
const {
  allUsers,
  singleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("./Api");

router.route("/").get(allUsers).post(createUser);

router.route("/:id").get(singleUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").put(addFriend).delete(deleteFriend);

module.exports = router;

// /api/users

//GET all users

// GET a single user by its _id and populated thought and friend data

// POST a new user:

// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// PUT to update a user by its _id

// DELETE to remove user by its _id

///api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list
