import mongoose from 'mongoose';

let initialized: boolean = false;

export const connect = async () => {
  mongoose.set('strictQuery', true);

  if (initialized) {
    console.log('Already Connected To MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: 'devnexus-next',
    });

    console.log('Connected To MongoDB');

    initialized = true;
  } catch (error) {
    console.error(`Error Connecting To MongoDB: ${error}`);
  }
};
