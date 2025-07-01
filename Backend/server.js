// const dotenv = require("dotenv");
// dotenv.config();
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import app from './src/app.js';

// db connent
import connectToDatabase from './src/db/Database.js';
connectToDatabase()



// server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})