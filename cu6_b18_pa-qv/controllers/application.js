/*
    INSTRUCTION: setup the controller functions to handle job applications
    - getApplicationsByJob - Retrieve all applications for a specific job (use `populate()` to get job details)
    - createApplication - Create a new application for a job (ensure no duplicate applications for the same email and job)
*/
const Application = require("../models/application");


const getAllApplication = async (req, res) => {
    try {
        const applications = await Application.find().populate("job");
        res.status(200).json(applications);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};

const createApplication = async (req, res) => {
    try {
        if (req.body.application && !(await Application.exists({ _id: req.body.application }))) {
            return res.status(400).json({ message: "Application not found" });
        }
        const applications = await Application.create(req.body);
        res.status(201).json(applications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllApplication,
    createApplication,
}