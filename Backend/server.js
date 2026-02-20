import dotenv from "dotenv";
dotenv.config();
import app from './src/app.js';

// db connect
import connectToDatabase from './src/db/Database.js';
connectToDatabase()

app.get("/", (req, res) => {
    res.send("Hello World! Server is live.");
})

// server
const port = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

export default app;