const bookModel = require("../models/book.model");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

module.exports = {
  getAllBooksCount: asyncHandler(async (req, res) => {
    const { _id } = req.user;

    const [count] = await bookModel.aggregate([
      {
        $match: {
          userRef: _id,
          isDelete: false,
        },
      },
      {
        $group: {
          _id: null,
          totalBooks: { $sum: 1 },
          wantToRead: {
            $sum: {
              $cond: [{ $eq: ["$status", "read"] }, 1, 0],
            },
          },
          reading: {
            $sum: {
              $cond: [{ $eq: ["$status", "reading"] }, 1, 0],
            },
          },
          completed: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalBooks: 1,
          wantToRead: 1,
          reading: 1,
          completed: 1,
        },
      },
    ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        count || {
          totalBooks: 0,
          wantToRead: 0,
          reading: 0,
          completed: 0,
        },
        "count fetch successfully",
      ),
    );
  }),

  getAllTags: asyncHandler(async (req, res) => {
    const { _id } = req.user;

    const tags = await bookModel.aggregate([
      {
        $match: {
          userRef: _id,
          isDelete: false,
        },
      },
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
        },
      },
      {
        $project: {
          _id: 0,
          tag: "$_id",
        },
      },
      {
        $sort: {
          tag: 1,
        },
      },
    ]);

    return res
      .status(200)
      .json(new ApiResponse(200, tags, "Tags fetched successfully"));
  }),
};
