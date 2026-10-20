const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5123;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cu6_b18_pa-qv";

const jobRoutes = require("./routes/job");
const employerRoutes = require("./routes/employer");
const applicationRoutes = require("./routes/application")

app.use(express.json());

// INSTRUCTION: setup cors
app.use(cors());

// INSTRUCTION: setup MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error.message));


// INSTRUCTION: setup routes

app.use("/applications", applicationRoutes);
app.use("/jobs", jobRoutes);
app.use("/employers", employerRoutes);



app.get("/", (req, res) => {
    res.send("Good luck with the exam!");
});

// Server listening
app.listen(port, () => console.log(`Server started on port ${port}`));
