import express from 'express';
import { PostModel, Post } from '../models/post';
import { CommentModel } from '../models/comment';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await PostModel.find().populate('comments');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id).populate('comments');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
});

// Create a new post
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('comments');
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const result = await PostModel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Post not found' });
    await CommentModel.deleteMany({ postId: req.params.id }); // Delete comments related to the post
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
});

export default router;
