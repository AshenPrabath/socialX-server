import express from 'express';
import mongoose from 'mongoose';
import { PostModel, Post } from './models';
// import { CommentModel, Comment } from './models';
import { CommentModel } from './models/comment';
import { Comment } from './models/comment';

const router = express.Router();

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await PostModel.find().populate('comments');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Get a single post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id).populate('comments');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
});

// Create a new post
router.post('/posts', async (req, res) => {
  try {
    const newPost: Post = req.body;
    const post = new PostModel(newPost);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
});

// Update an existing post
router.put('/posts/:id', async (req, res) => {
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('comments');
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
});

// Delete a post
router.delete('/posts/:id', async (req, res) => {
  try {
    const result = await PostModel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Post not found' });
    await CommentModel.deleteMany({ postId: req.params.id }); // Delete comments related to the post
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
});

// Add a comment to a post
router.post('/posts/:id/comments', async (req, res) => {
  try {
    const postId = new mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
    const newComment: Comment = req.body;
    newComment.postId = postId; // Set the postId
    const comment = new CommentModel(newComment);
    await comment.save();
    await PostModel.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
});

// Get all comments for a post
router.get('/posts/:id/comments', async (req, res) => {
  try {
    const comments = await CommentModel.find({ postId: req.params.id });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
});

// Update a comment
router.put('/comments/:id', async (req, res) => {
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error });
  }
});

// Delete a comment
router.delete('/comments/:id', async (req, res) => {
  try {
    const result = await CommentModel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Comment not found' });
    await PostModel.updateMany({ comments: req.params.id }, { $pull: { comments: req.params.id } }); // Remove comment reference from posts
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
});

export default router;
