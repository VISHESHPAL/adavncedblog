import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title) {
      return res.status(401).json({
        success: false,
        message: "Title is Required ! ",
      });
    }

    const post = await Post.create({
      title,
      content,
      tags,
      author: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Post created Successfully !",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in the creating the post ! ",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found ! ",
      });
    }

    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not allowed to edit this post !",
      });
    }

    Object.assign(post, req.body);
    await post.save();

    return res.status(201).json({
      success: true,
      message: "Post Updated Successfully ! ",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in the updating the post ! ",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not found ! ",
      });
    }

    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not allowed to delete this post !",
      });
    }

    await post.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Post Deleted Successfullly  ! ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in the deleting  the post ! ",
    });
  }
};
export const togglePublish = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not found ! ",
      });
    }

    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not Allowed ! ",
      });
    }

    post.isPublished = !post.isPublished;
    await post.save();

    return res.status(201).json({
      success: true,
      message: post.isPublished
        ? "Post Published ! "
        : "Post moved to the draft !",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in the publishing  the post ! ",
    });
  }
};

export const getAllPublicPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isPublished: true })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All published post got successfully ! ",
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in the getting all  the post ! ",
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");

    if (!post || !post.isPublished) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found ! ",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post found Successfully ! ",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in the getting  the Single  post ! ",
    });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found ! ",
      });
    }

    const userId = req.user.id;

    const alredayLiked = post.likes.includes(userId);

    if (alredayLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    return res.status(200).json({
      success: true,
      likesCount: post.likes.length,
      message: alredayLiked ? "Post Unliked !" : "Post Liked !",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in  Liking  post ! ",
    });
  }
};
