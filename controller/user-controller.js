const { User } = require("../Models/user-model");

const userController = {
  allUsers(req, res) {
    User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(error => res.status(500).json(error));
  },

  singleUser({ params }, res) {
    User.findById(params.id)
      .populate("thoughts", "-__v")
      .populate("friends", "-__v")
      .select("-__v")
      .then(dbUserData => {
        if (!dbUserData)
          return res
            .status(404)
            .json({ message: "There is no user with this id." });
        else return res.json(dbUserData);
      })
      .catch(error => res.status(500).json(error));
  },

  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(error => res.status(500).json(error));
  },

  updateUser({ params, body }, res) {
    User.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData)
          return res
            .status(404)
            .json({ message: "There is no user with this id." });
        else return res.json(dbUserData);
      })
      .catch(error => res.status(500).json(error));
  },

  deleteUser({ params }, res) {
    User.findByIdAndDelete(params.id)
      .then(dbUserData => {
        if (!dbUserData)
          return res
            .status(404)
            .json({ message: "There is no user with this id." });
        else return res.json(dbUserData);
      })
      .catch(error => res.status(500).json(error));
  },

  addFriend({ params }, res) {
    User.findById(params.friendId)
      .then(dbFriendData => {
        if (!dbFriendData) {
          return res.status(404).json({ message: "Friend ID not found." });
        }

        User.findByIdAndUpdate(
          params.userId,
          { $addToSet: { friends: dbFriendData._id } },
          { new: true, runValidators: true }
        ).then(dbUserData =>
          !dbUserData
            ? res
                .status(404)
                .json({ message: "There is no user with this id." })
            : res.json(dbUserData)
        );
      })
      .catch(error => res.status(500).json(error));
  },

  deleteFriend({ params }, res) {
    User.findById(params.friendId)
      .then(dbFriendData => {
        if (!dbFriendData) {
          return res.status(404).json({ message: "Friend ID not found." });
        }

        User.findByIdAndUpdate(
          params.userId,
          { $pull: { friends: dbFriendData._id } },
          { new: true }
        ).then(dbUserData =>
          !dbUserData
            ? res
                .status(404)
                .json({ message: "There is no user with this id." })
            : res.json(dbUserData)
        );
      })
      .catch(error => res.status(500).json(error));
  },
};

module.exports = userController;
