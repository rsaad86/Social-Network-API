const { Thought, User } = require("../Models");

const thoughtController = {
  allThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(error => res.status(500).json(error));
  },

  singleThought({ params }, res) {
    Thought.findById(params.id)
      .select("-__v")
      .then(dbThoughtData =>
        !dbThoughtData
          ? res
              .status(404)
              .json({ message: "Thought with associated id not found." })
          : res.json(dbThoughtData)
      )
      .catch(error => res.status(500).json(error));
  },

  createThought({ body }, res) {
    User.find({ username: body.username })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: "User not found." });
        }
        Thought.create(body).then(dbThoughtData => {
          dbUserData[0].thoughts.push(dbThoughtData._id);

          dbUserData[0]
            .save()
            .then(() => res.json({ user: dbUserData, thought: dbThoughtData }));
        });
      })
      .catch(error => res.status(500).json(error));
  },

  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })
      .then(dbThoughtData =>
        !dbThoughtData
          ? res
              .status(404)
              .json({ message: "Thought with associated id not found." })
          : res.json(dbThoughtData)
      )
      .catch(error => res.status(500).json(error));
  },

  deleteThought({ params }, res) {
    Thought.findByIdAndDelete(params.id)
      .then(dbThoughtData =>
        !dbThoughtData
          ? res
              .status(404)
              .json({ message: "Thought with associated id not found." })
          : res.json(dbThoughtData)
      )
      .catch(error => res.status(500).json(error));
  },

  addReaction({ params, body }, res) {
    Thought.findByIdAndUpdate(
      params.thoughtId,
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData =>
        !dbThoughtData
          ? res
              .status(404)
              .json({ message: "Thought with associated id not found." })
          : res.json(dbThoughtData)
      )
      .catch(error => res.status(500).json(error));
  },

  deleteReaction({ params }, res) {
    Thought.findByIdAndUpdate(
      params.thoughtId,
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData =>
        !dbThoughtData
          ? res
              .status(404)
              .json({ message: "Thought with associated id not found." })
          : res.json(dbThoughtData)
      )
      .catch(error => res.status(500).json(error));
  },
};

module.exports = thoughtController;
