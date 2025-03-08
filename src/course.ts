import mongoose, { Schema, model } from 'mongoose';

// 1. Create an interface representing a TS object.
export interface ICourse {
    _id?: mongoose.Types.ObjectId;
    name: string;
    code: string;
    description: string;
    credits: number;
    department: string;
    students?: mongoose.Types.ObjectId; // Reference to User
}

// 2. Create a Schema corresponding to the document in MongoDB.
const courseSchema: Schema = new Schema<ICourse>({
    _id: { type: mongoose.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, // Generar un nuevo ObjectId por defecto
    name: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    credits: { type: Number, required: true },
    department: { type: String, required: true },
    students: [{ type: mongoose.Types.ObjectId, ref: 'user' }] // Reference to User
});

// 3. Create a Model.
export const CourseModel = model('Course', courseSchema);
