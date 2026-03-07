import Comment from "../models/comment.model.js";

export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.postId;

    const comment = await Comment.create({
      content,
      post: postId,
      author: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Comment Created Successfully !",
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Adding the Comment",
    });
  }
};

export const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    }).populate("author", "name");

    return res.status(200).json({
      success: true,
      message: "Comment got Successfully !",
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Getting the Comment",
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment Not Found !",
      });
    }

    if (
      comment.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not Allwed to Changes the Commnet !",
      });
    }

    comment.content = req.body.content;
    await comment.save();

    return res.status(201).json({
      success: true,
      message: "Comment Updated Successfully  ! ",
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in updating the Comment",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment Not Found ! ",
      });
    }

    if (
      comment.author.toString() !== req.user.id &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not Allwed to delete the Commnet !",
      });
    }

    await comment.deleteOne;

    return res.status(200).json1({
      success: true,
      message: "Comment Deleted Successfully ! ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in deleting the Comment",
    });
  }
};
