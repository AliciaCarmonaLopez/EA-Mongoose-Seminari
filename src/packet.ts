import { Schema, model } from 'mongoose';
import { UserModel, IUser } from './user.js';
// 1. Create an interface representing a TS object.
export interface IPacket {
  weight: number;
  _id?: any;
  user: IUser;
};

// 2. Create a Schema (estructura de dades) corresponding to the document in MongoDB.
const packetSchema = new Schema<IPacket>({
  weight: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// 3. Create a Model.
export const PacketModel = model('Packet', packetSchema);