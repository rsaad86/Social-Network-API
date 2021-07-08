const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: "Username is required.",
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: "Email address is required",
      unique: true,
      trim: true,
      match: [
        /^[\w\.]+@([\w]+\.)+[\w]{2,4}$/,
        "Please use a valid email address.",
      ],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

//username, email, thoughts, friends
