const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const bookModel = require("../models/book.model");
const ApiError = require("../utils/ApiError");

module.exports = {
  addBook: asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { title, author, tags, status } = req.body;

    const requiredFields = { title, author, tags, status };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      throw new ApiError(
        400,
        `${missingFields.join(", ")} ${missingFields.length > 1 ? "are" : "is"} required`,
      );
    }

    const bookExist = await bookModel.findOne({
      $and: [{ title }, { author }],
      user: _id,
    });

    if (bookExist) {
      throw new ApiError(409, "Book already exists");
    }

    await bookModel.create({
      title: title,
      author: author,
      tags: Array.isArray(tags) ? tags : [tags],
      status: status,
      userRef: _id,
    });

    return res
      .status(201)
      .json(new ApiResponse(200, null, "Book created successfully"));
  }),
  getBooks: asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { filterBy = {} } = req.body;

    const matchStage = {
      userRef: _id,
      isDelete: false,
    };

    // Status filter
    if (filterBy.status && filterBy.status !== "all") {
      matchStage.status = filterBy.status;
    }

    // Tags filter
    if (filterBy.tags) {
      const tags = Array.isArray(filterBy.tags)
        ? filterBy.tags
        : [filterBy.tags];

      if (tags.length > 0) {
        matchStage.tags = {
          $in: tags,
        };
      }
    }

    const bookData = await bookModel.aggregate([
      {
        $match: matchStage,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return res
      .status(200)
      .json(new ApiResponse(200, bookData, "Books fetched successfully"));
  }),
  updateBook: asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bookId, title, author, tags, status } = req.body;

    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (author !== undefined) updateData.author = author;
    if (tags !== undefined) {
      updateData.tags = Array.isArray(tags) ? tags : [tags];
    }
    if (status !== undefined) updateData.status = status;

    if (Object.keys(updateData).length === 0) {
      throw new ApiError(400, "At least one field is required to update");
    }

    const book = await bookModel.findOneAndUpdate(
      {
        _id: bookId,
        userRef: _id,
        isDelete: false,
      },
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!book) {
      throw new ApiError(404, "Book not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, book, "Book updated successfully"));
  }),
  deleteBook: asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bookId } = req.body;

    const book = await bookModel.findOneAndUpdate(
      {
        _id: bookId,
        userRef: _id,
        isDelete: false,
      },
      {
        $set: {
          isDelete: true,
        },
      },
    );

    if (!book) {
      throw new ApiError(404, "Book not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Book Deleted successfully"));
  }),
};
