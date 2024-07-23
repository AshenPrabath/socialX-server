import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { CommentModel, Comment } from '../models/comment';
import { PostModel } from '../models/post';

const router = express.Router();

// Add a comment to a post
router.post(
  '/:id',
  [
    check('author').isString().notEmpty().withMessage('Author is required'),
    check('content').isString().notEmpty().withMessage('Text is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const postId = new mongoose.Types.ObjectId(req.params.id);
      const newComment: Comment = req.body;
      newComment.postId = postId;
      const comment = new CommentModel(newComment);
      await comment.save();
      await PostModel.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Error adding comment', error });
    }
  }
);

export default router;
