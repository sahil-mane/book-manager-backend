const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Title is required"],
      unique: true,
    },
    author: {
      type: String,
      require: [true, "Author is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["read", "reading", "completed"],
      default: "read",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Book", bookSchema);
