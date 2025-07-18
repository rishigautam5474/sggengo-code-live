import mongoose from "mongoose";

async function MongoDbConnection(uri) {
    await mongoose.connect(uri);
}

export default MongoDbConnection;