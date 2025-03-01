import mongoose from 'mongoose';
import { UserModel, IUser } from './user.js';
import { PacketModel, IPacket } from './packet.js';
const { Schema } = mongoose;
async function main() {
  mongoose.set('strictQuery', true); // Mantiene el comportamiento actual

  await mongoose.connect('mongodb://localhost:27017/test')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar:', err));

  const user1:  IUser = {
    "name": 'Bill',
    "email": 'bill@initech.com',
    "avatar": 'https://i.imgur.com/dM7Thhn.png'
  };
  /*                    SAVE                        */
  console.log("user1", user1); 
  const newUser= new UserModel(user1);
  await newUser.save();
  const packet1: IPacket = {
    "weight": 5,
    "user": newUser._id
  };
  console.log("packet1", packet1);
  await new PacketModel(packet1).save();
  /*                    POPULATE                        */
  const packet: IPacket | null = await PacketModel.
    findOne({weight: 5}).
    populate('user').
    exec();
  console.log(mongoose.isValidObjectId(packet.user) ? 'User is populated' : 'User is not populated');
  if(packet.user != null){
    console.log('The user is %s', packet.user);
  }
  else{
    console.log('User not found');
  }

  const packet2: IPacket = {
    "weight": 6,
    "user": newUser._id
  };
  console.log("packet2", packet2);
  await new PacketModel(packet2).save();

  /*                    UPDATE                        */
  const res: any = await UserModel.
    updateOne({ name: 'Bill' }, { $push: { packets: { $each: [packet1._id, packet2._id] } } });
  console.log(res);

  /*                    SELECT                       */
  const userSelected: Partial<IUser> | null  = await UserModel.findOne({ name: 'Bill' })
    .select('name email').lean();
  console.log("user5",userSelected);

  /*                    DELETE                       */
  const res2: any = await UserModel.deleteOne({ name: 'Bill' });
  console.log(res2);
  const userDeleted: Partial<IUser> | null  = await UserModel.findOne({ name: 'Bill' })
  .select('name email').lean();
  console.log("user5",userDeleted);
 
 
 
 
  /*console.log("user2",user2);

  // findById devuelve un objeto usando el _id.
  const user3: IUser | null = await UserModel.findById(user2._id);
  console.log("user3",user3);

  // findOne devuelve un objeto usando un filtro.
  const user4: IUser | null = await UserModel.findOne({name: 'Bill'});
  console.log("user4",user4);

  // Partial<IUser> Indica que el objeto puede tener solo algunos campos de IUser.
  // select('name email') solo devuelve name y email.
  // lean() devuelve un objeto plano de JS en lugar de un documento de Mongoose.
  const user5: Partial<IUser> | null  = await UserModel.findOne({ name: 'Bill' })
    .select('name email').lean();
  console.log("user5",user5);
  */

}

main()

    
