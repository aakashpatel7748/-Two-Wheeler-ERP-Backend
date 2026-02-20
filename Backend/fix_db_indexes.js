import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const fixIndexes = async () => {
    try {
        console.log("Connecting to database...", process.env.MONGODB_URI ? "URI found" : "URI missing");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected successfully.");

        const collection = mongoose.connection.collection('branches');
        const indexes = await collection.indexes();
        console.log("Current indexes:", indexes.map(i => i.name));

        // Drop code_1
        try {
            if (indexes.find(i => i.name === 'code_1')) {
                await collection.dropIndex('code_1');
                console.log("Dropped index: code_1");
            } else {
                console.log("Index code_1 not found, skipping.");
            }
        } catch (err) {
            console.error("Error dropping code_1:", err.message);
        }

        // Drop email_1 if exists
        try {
            if (indexes.find(i => i.name === 'email_1')) {
                await collection.dropIndex('email_1');
                console.log("Dropped index: email_1");
            } else {
                console.log("Index email_1 not found, skipping.");
            }
        } catch (err) {
            console.error("Error dropping email_1:", err.message);
        }

    } catch (error) {
        console.error("Script failed:", error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

fixIndexes();
