const { Schema, model, Types } = require("mongoose");
const formatDate = require("../utils/helpers");

//Define a reaction schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: "A Reaction is required.",
      maxLength: 280,
      trim: true,
    },

    username: {
      type: String,
      required: "Username is required.",
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
  },
  {
    toJSON: { getters: true },
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "A Thought is required",
      maxLength: 280,
      trim: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },

    username: {
      type: String,
      required: "Username is required.",
    },

    reactions: [reactionSchema],
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;

//thoughtText, createdAt, username, reactions

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
