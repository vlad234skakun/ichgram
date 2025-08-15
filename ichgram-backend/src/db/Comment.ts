import {Schema , model, Document, Types} from "mongoose"

export interface CommentDocument extends Document {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  text: string;
}

const CommentSchema = new Schema<CommentDocument>(
	{
	postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  text: { type: String, required: true },
	},
	{ versionKey: false, timestamps: true }
);

const Comment = model<CommentDocument>("Comment", CommentSchema);

export default Comment