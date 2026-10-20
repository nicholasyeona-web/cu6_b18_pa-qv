/*
    INSTRUCTION: setup the employer controller with the following functions:
    - getEmployers - Retrieve all employers
    - getEmployer - Retrieve a specific employer
    - addNewEmployer - Add a new employer
    - updateEmployer - Update an employer
    - deleteEmployer - Delete an employer
*/
const Employer = require("../models/employer");
const Job = require("../models/job");

const getAllEmployer = async (req, res) => {
    try {
        const employers = await Employer.find();
        res.status(200).json(employers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getEmployerById = async (req, res) => {
    try {
        const employers = await Employer.findById(req.params.id).populate("Job");
        if (!employers) return res.status(404).json({ message: "Class not found" });
        res.status(200).json(employers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    // TODO
};

const createEmployer = async (req, res) => {
    try {
        if (req.body.job && !(await Job.exists({ _id: req.body.job }))) {
            return res.status(400).json({ message: "Employer not found" });
        }
        const employers = await Employer.create(req.body);
        res.status(201).json(employers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateEmployer = async (req, res) => {
    try {
        if (req.body.job && !(await Job.exists({ _id: req.body.job }))) {
            return res.status(400).json({ message: "employer not found" });
        }
        const employers = await Employer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).populate("employer");
        if (!employers) return res.status(404).json({ message: "Employer not found" });
        res.status(200).json(employers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    // TODO
};

const deleteEmployer = async (req, res) => {
    try {
        const employers = await Employer.findByIdAndDelete(req.params.id);
        if (!employers) return res.status(404).json({ message: "Employer not found" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    // TODO
};

module.exports = {
    getAllEmployer,
    getEmployerById,
    createEmployer,
    updateEmployer,
    deleteEmployer,
};
