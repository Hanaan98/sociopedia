import Post from "../models/post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, desc, img } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId: user._id,
      desc,
      img,
      profilePicture: user.profilePicture,
      likes: new Map(),
    });
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(201).json(posts);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({ err: "User id not found" });
    const posts = await Post.find({ userId: userId });
    return res.status(201).json(posts);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.params.userId;
    const post = await Post.findById(postId);
    if (!post) return res.status(400).json({ err: "Post not found" });
    if (post.likes.get(userId)) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.params.userId;
    const comment = req.body.comment;
    const post = await Post.findById(postId);
    if (!post) return res.status(400).json({ err: "Post not found" });
    post.comments.push({ userId, comment });
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ err: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
