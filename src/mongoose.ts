import mongoose, {Schema} from 'mongoose';
import { UserModel, IUser } from './user.js';
import { CourseModel, ICourse } from './course.js';

async function main() {
  mongoose.set('strictQuery', true); // Mantiene el comportamiento actual

  await mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar:', err));

  const user1:  IUser = {
    "name": 'Bill',
    "email": 'bill@initech.com',
    "avatar": 'https://i.imgur.com/dM7Thhn.png'
  };

  console.log("user1", user1); 
  const newUser= new UserModel(user1);
  const user2: IUser = await newUser.save();
  console.log("user2",user2);

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

  // Course operations

  //Create a course
  const course1: ICourse = {
    "_id": new mongoose.Types.ObjectId(),
    "name": 'Software Engineering',
    "code": 'SE-105',
    "description": 'Learn how to build software.',
    "credits": 3,
    "department": 'Computer Science',
  };

  console.log("course1", course1);
  const newCourse = new CourseModel(course1);
  const course2 = await newCourse.save();
  console.log("course2", course2);

  const course3: ICourse | null = await CourseModel.findOne({code: 'SE-102'});
  console.log("course4", course3);

  // Update a course
  const updatedCourse = await CourseModel.findByIdAndUpdate(
    course2._id,
    { credits: 4 },
    { new: true }
  );
  console.log("updatedCourse", updatedCourse);

  // Delete a course
  const deletedCourse = await CourseModel.findByIdAndDelete(course2._id);
  console.log("deletedCourse", deletedCourse);

  // Read all courses
  const allCourses: ICourse[] = await CourseModel.find();
  console.log("allCourses", allCourses);

  //--------------------------------------------------------------------------------

  // Aggregation pipeline example
  const course6: ICourse = {
    "_id": new mongoose.Types.ObjectId(),
    "name": 'Aerospace Engineering',
    "code": 'AE-150',
    "description": 'Learn how to build rockets.',
    "credits": 4,
    "department": 'Aerospace',
  };
  const newCourse6 = new CourseModel(course6);
  const savedCourse6 = await newCourse6.save();
  
  const user8:  IUser = {
    "name": 'Alice',
    "email": 'alice@initech.com',
    "avatar": 'https://i.imgur.com/dM7Thhn.png',
    "courses": [(savedCourse6._id as mongoose.Types.ObjectId)]
  };

  const newUser8= new UserModel(user8);
  const savedUser8: IUser = await newUser8.save();

  // Verify user8 is stored with correct course ID
  const retrievedUser8 = await UserModel.findById(savedUser8._id);
  console.log("Retrieved user8 by ID:", retrievedUser8);
  const retrievedCourse6 = await CourseModel.findById(savedCourse6._id);
  console.log("Retrieved course6 by ID:", retrievedCourse6);


  // Populate example
  //const populatedUser: IUser | null = await UserModel.findOne({name:'Alice'}).populate('courses').exec();
  const populatedUser = await UserModel.findOne({name:'Alice'});

  await populatedUser?.populate('courses');

  populatedUser?.populated('courses');

  console.log("populatedUser", populatedUser);
  console.log("The user is enroled in", populatedUser?.courses);
  

}

main()

    
