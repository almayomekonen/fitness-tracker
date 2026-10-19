const mongoose = require('mongoose');

exports.connectDB = async () => {
    try {
      const connection = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.26zhx4l.mongodb.net/${process.env.DB_NAME}`);

        console.log(`MongoDB connected successfully: ${connection.connection.host}`);
        
    } catch (error) {
        console.error("❌ Failed to connect to mongodb");
        console.error(error.message);

        process.exit(1);
    }
}