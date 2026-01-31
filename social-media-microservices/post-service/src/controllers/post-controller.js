const logger = require("../utils/logger");


// create post
const createPost = async (req, res) => {
  logger.info("Create post endpoint hit...");
  try {
    //validate the schema
    const { error } = validateCreatePost(req.body);
    if (error) {
      logger.warn("Validation error", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { content, mediaIds } = req.body;
    const newlyCreatedPost = new Post({
      user: req.user.userId,
      content,
      mediaIds: mediaIds || [],
    });

    await newlyCreatedPost.save();

    await publishEvent("post.created", {
      postId: newlyCreatedPost._id.toString(),
      userId: newlyCreatedPost.user.toString(),
      content: newlyCreatedPost.content,
      createdAt: newlyCreatedPost.createdAt,
    });

    await invalidatePostCache(req, newlyCreatedPost._id.toString());
    logger.info("Post created successfully", newlyCreatedPost);
    res.status(201).json({
      success: true,
      message: "Post created successfully",
    });
  } catch (e) {
    logger.error("Error creating post", error);
    res.status(500).json({
      success: false,
      message: "Error creating post",
    });
  }
};


// get all posts
const getAllPosts = () => {
  try {
    
  } catch (error) {
    logger.error("Error fetching posts", error);
    res.status(500).json({
      success : false,
      message : "Error fetching posts",
    })
  }
};

// get post by Id
const getPost = () => {
  try {
    
  } catch (error) {
    logger.error("Error fetching post", error);
    res.status(500).json({
      success : false,
      message : "Error fetching post by Id",
    })
  }
};


// delete post
const deletePost = () => {
  try {
    
  } catch (error) {
    logger.error("Error deleting posts", error);
    res.status(500).json({
      success : false,
      message : "Error deleting post",
    })
  }
};



module.exports = { createPost, getAllPosts, getPost, deletePost };