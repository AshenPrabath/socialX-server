import express from 'express';
import mongoose from 'mongoose';
import { CommentModel, Comment } from '../models/comment';
import { PostModel } from '../models/post';

const router = express.Router();

// Add a comment to a post
router.post('/:id', async (req, res) => {
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
router.get('/:id', async (req, res) => {
  try {
    const comments = await CommentModel.find({ postId: req.params.id });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
});

// Update a comment
router.put('/:id', async (req, res) => {
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error });
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
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
