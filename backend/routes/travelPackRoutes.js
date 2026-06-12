const express = require('express');
const router = express.Router();

const travelPackageController = require('../controllers/travelpackController');

router.get('/', travelPackageController.getTravelPackages);
router.post('/', travelPackageController.addTravelPackage);

router.get('/usersCount', travelPackageController.getQuantityOfUsersByTravelPackage);

module.exports = router;