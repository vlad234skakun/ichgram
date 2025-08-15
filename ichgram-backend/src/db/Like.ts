import {Schema , model, Document, Types} from "mongoose"

interface ILike {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
}

export type LikeDocument = ILike & Document<Types.ObjectId>;

const LikeSchema = new Schema<ILike>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Like = model<ILike>("like", LikeSchema);

export default Like;