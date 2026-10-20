/*
    INSTRUCTION: setup the job schema according to the following requirements:
    - title: (String, required)
    - employer: (ObjectId, ref: 'Employer', required)
    - postedDate: (Date, required)
    - location: (String, required)
    - category: (String)
    - description: (String)
*/
const mongoose = require("mongoose");


const JobSchema = new mongoose.Schema({
    title: { type: String, required: true},
    employer: { type: mongoose.Schema.Types.ObjectId, ref: "employer", required: true},
    postedDate: { type: Date, required: true},
    location: { type: String, required: true},
    category: { type: String},
    description: { type: String},
});


module.exports = mongoose.model("job", JobSchema);