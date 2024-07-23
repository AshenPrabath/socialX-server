import mongoose, { Document, Schema } from 'mongoose';

export interface Post extends Document {
  title: string;
  content: string;
  created_at?: Date;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export const PostModel = mongoose.model<Post>('Post', PostSchema);
