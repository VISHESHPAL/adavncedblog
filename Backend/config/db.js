import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      `${process.env.MONGO_URI}/blogThree`,
    );
    console.log(`Database Connected Successfully !`, connect.connection.host);
  } catch (error) {
    console.log("Error while connecting the database ! ", error);
  }
};

export default connectDB;
