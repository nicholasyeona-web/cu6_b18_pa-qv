/*
    INSTRUCTION: setup the job controller with the following functions:
    - getJobs - Retrieve all jobs (use `populate()` to get employer details)
    - getJob - Retrieve a specific job (use `populate()` to get employer details)
    - addNewJob - Add a new job
    - updateJob - Update a job
    - deleteJob - Delete a job
*/
const Employer = require("../models/employer");
const Job = require("../models/job");


const getAllJob = async (req, res) => {
  try {
    const jobs = await Job.find().populate("employer");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message});
  }
    // TODO
};

const getJobById = async (req, res) => {
  try {
    const jobs = await Job.findById(req.params.id).populate("employer");
    if (!jobs) return res.status(404).json({ message: "Job not found"});
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
    // TODO
};


const createJob = async (req, res) => {
  try {
    const jobs = await Job.create(req.body);
    res.status(201).json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message});
  }
    // TODO
};


const updateJob = async (req, res) => {
  try {
    const jobs = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!jobs) return res.status(404).json({ message: "Job not found"});
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message});
  }
    // TODO
};

const deleteJob = async (req, res) => {
  try {
    if (!(await Job.exists({ _id: req.params.id}))) {
      return res.status(404).json({ message: "Job not found"});
    }
    if (await Employer.exists({ job: req.params.id})) {
      return res.status(409).json({ message: "Job still "});
    }
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
    // TODO
};

module.exports = {
    getAllJob,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
};