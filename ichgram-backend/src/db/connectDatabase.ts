import mongoose from "mongoose";

const { DATABASE_URI } = process.env

const connectDatabase = async () => {
    try {
        if(typeof DATABASE_URI !== "string") throw Error("DATABASE_URI not found")
        await mongoose.connect(DATABASE_URI)
        console.log('Успешное подключение к базе данных');
    } catch (error) {
        console.log("Ошибка при подключении к базе данных");
        console.log(error);
    }
}
export default connectDatabase