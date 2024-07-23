import mongoose, { Document, Schema } from 'mongoose';

// Post Model
export interface Post extends Document {
  title: string;
  content: string;
  color: string;
  comments?: mongoose.Types.ObjectId[]; // Array of ObjectId
  created_at?: Date;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  color: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  created_at: { type: Date, default: Date.now }
});

export const PostModel = mongoose.model<Post>('Post', PostSchema);
