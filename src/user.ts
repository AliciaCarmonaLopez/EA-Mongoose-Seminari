import { Schema, model } from 'mongoose';
import { IPacket } from './packet.js';
// 1. Create an interface representing a TS object.
export interface IUser {
  name: string;
  email: string;
  avatar?: string;
  _id?: any;
  packets?: IPacket[];
}

// 2. Create a Schema (estructura de dades) corresponding to the document in MongoDB.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  packets: [{ type: Schema.Types.ObjectId, ref: 'Packet' }],
});

// 3. Create a Model.
export const UserModel = model('User', userSchema);