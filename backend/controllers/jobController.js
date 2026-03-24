const Job = require('../models/job');

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

// Create job
const createJob = async (req, res) => {
  try {
    console.log('Incoming createJob request from UI. User:', req.userId);
    console.log('Request body:', req.body);
    
    const { title, company, location, status, appliedDate } = req.body;

    // Validate required fields
    if (!title || !company || !location) {
      console.log('Validation failed. Missing required fields.');
      return res.status(400).json({ error: 'Title, company and location are required' });
    }

    const job = new Job({
      title,
      company,
      location,
      status: status || 'saved',
      appliedDate: appliedDate || new Date(),
      userId: req.userId
    });

    await job.save();
    console.log('Job created:', job._id, 'for user:', req.userId);
    res.status(201).json(job);
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
};

// Update job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
};

// Delete job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
};

// Get statistics
const getStats = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.userId });

    const stats = {
      total: jobs.length,
      saved: jobs.filter(j => j.status === 'saved').length,
      applied: jobs.filter(j => j.status === 'applied').length,
      interview: jobs.filter(j => j.status === 'interview').length,
      offer: jobs.filter(j => j.status === 'offer').length,
      rejected: jobs.filter(j => j.status === 'rejected').length
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

module.exports = { getJobs, createJob, updateJob, deleteJob, getStats };