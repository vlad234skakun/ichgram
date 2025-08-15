import {Schema , model, Document, Types} from "mongoose"
// import { Types } from 'mongoose';

export interface User { 
    fullname: string;
    username: string;
    email: string;
    password: string;
    role: "superadmin" | "admin" | "user";
    token?: string;
    verificationCode?: string;
    verify: boolean;
    biography?: string;
    website?: string;
    profilePhoto?: string;
    followers: Types.ObjectId[];
    following: Types.ObjectId[];
    
}

export type UserDocument = User & Document;

const userSchema = new Schema<UserDocument>({
	fullname: {
        type: String,
        required: true,
    },
		username: { 
			type: String,
			required: true,
		},
    email: {
        type: String,
        unique: true,
        // match: 
        required: true,
    },
    password: {
        type: String ,
        required: true ,
    },
    role: {
        type: String, 
        enum: {
            values: ["superadmin", "admin", "user"],
            message: "пользователь с ролями уже существует"
        },
            
        default: "user",
        required: true ,
    },
    token: {
        type: String , 
        required: false,
    },
    verificationCode: {
        type: String
    },
    verify: { 
        type: Boolean,
        default: false,
        required: true

    },
     biography: {
      type: String,
        required: false

    },
    website: {
      type: String,
    },
    profilePhoto: {
      type: String,
        required: false
    },
    followers: { type: [Schema.Types.ObjectId], ref: "user", default: [] },
    following: { type: [Schema.Types.ObjectId], ref: "user", default: [] }

}, {versionKey: false, timestamps:true })

const User = model<UserDocument>("user", userSchema)

export default User;
