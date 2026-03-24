const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getJobs, createJob, updateJob, deleteJob, getStats } = require('../controllers/jobController');

// All routes require authentication
router.use(auth);

router.get('/', getJobs);
router.post('/', createJob);
router.get('/stats', getStats);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;