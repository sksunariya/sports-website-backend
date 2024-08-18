const express = require('express');
const { getCourts } = require('../controllers/getCourts');
const { searchCourtByLocation } = require('../controllers/searchCourtByLocation');
const router = express.Router();


// Get all courts
router.get('/', getCourts);

// Search for courts by location and sport
router.get('/search', searchCourtByLocation);

module.exports = router;
