import mongoose, { Schema, model } from 'mongoose';
import { ICourse } from './course.js';

// 1. Create an interface representing a TS object.
export interface IUser {
  _id?: mongoose.Types.ObjectId; // ID of the user
  name: string;
  email: string;
  avatar?: string;
  courses?: mongoose.Types.ObjectId[]; // Reference to Course
}

// 2. Create a Schema corresponding to the document in MongoDB.
const userSchema = new Schema<IUser>({
  _id: { type: mongoose.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, // Generar un nuevo ObjectId por defecto
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  courses: [{ type: mongoose.Types.ObjectId, ref: 'Course'}] // Reference to Course
});

// 3. Create a Model.
export const UserModel = model('User', userSchema);