import {Schema , model, Document, Types} from "mongoose"

export interface PostDocument extends Document<Types.ObjectId> {
  userId: Types.ObjectId;
  text: string;
  photo: string;
  likesCount: number;
	commentsCount: number;
  // другие поля по необходимости
}

const PostSchema = new Schema<PostDocument>({
  userId: { 
		type: Schema.Types.ObjectId, 
		ref: 'user', 
		required: true },
  text: {
      type: String,
      required: false,
      default: null
    },
    photo: {
      type: String,
      required: true,
      match: /\.(jpg|jpeg|png|webp|gif)$/i,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    }, 
}, {versionKey: false, timestamps:true });

const Post = model<PostDocument>('Post', PostSchema);

export default Post;
