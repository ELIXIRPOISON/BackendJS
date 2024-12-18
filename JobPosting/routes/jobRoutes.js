const express = require('express');
const Job = require('../models/job');
const router = express.Router();

router.post('/jobs', async (req, res) => {
    try {
        const job = new Job(req.body);
        const savedJob = await job.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(400).json({ message: 'Error creating job', error: error.message });
    }
});

router.get('/jobs', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs', error: error.message });
    }
});

router.put('/jobs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, location, salary, company, jobType } = req.body;
        const updatedJob = await Job.findByIdAndUpdate(id, {
            title,
            description,
            location,
            salary,
            company,
            jobType
        }, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(400).json({ message: 'Error updating job', error: error.message });
    }
});

router.delete('/jobs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
