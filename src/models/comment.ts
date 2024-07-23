import mongoose, { Document, Schema } from 'mongoose';

// Comment Model
export interface Comment extends Document {
  postId: mongoose.Types.ObjectId; // ObjectId type from mongoose
  author: string;
  content: string;
  created_at?: Date;
}

const CommentSchema: Schema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export const CommentModel = mongoose.model<Comment>('Comment', CommentSchema);
