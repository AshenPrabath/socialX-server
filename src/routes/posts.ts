import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { PostModel, Post } from '../models/post';

const router = express.Router();

// Get all posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find().populate('comments');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Create a new post
router.post(
  '/',
  [
    check('title').isString().notEmpty().withMessage('Title is required'),
    check('content').isString().notEmpty().withMessage('Content is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post: Post = req.body;
      const newPost = new PostModel(post);
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: 'Error creating post', error });
    }
  }
);

// Get a single post by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findById(req.params.id).populate('comments');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
});

// Update a post by ID
router.put(
  '/:id',
  [
    check('title').optional().isString(),
    check('content').optional().isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Error updating post', error });
    }
  }
);

// Delete a post by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
});

export default router;
