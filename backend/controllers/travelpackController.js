const TravelPackage = require('../models/TravelPackage');
const { Sequelize } = require('sequelize');

const getTravelPackages = async (req, res) => {
    try {
        const travelPackages = await TravelPackage.findAll();
        res.json(travelPackages);
    } catch (error) {
        console.error('Error fetching travel packages:', error);
        res.status(500).send('Internal Server Error');
    }
};

const addTravelPackage = async (req, res) => {
    try {
        const { description, date, price, maxParticipants, remainingVacancies } = req.body;
        const travelPackage = await TravelPackage.create({ description, date, price, maxParticipants, remainingVacancies });
        res.json(travelPackage);
    } catch (error) {
        console.error('Error adding travel package:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getQuantityOfUsersByTravelPackage = async (req, res) => {
    try {
        const travelPackages = await TravelPackage.findAll({
            attributes: [
                'description',
                [
                    Sequelize.literal(`
                    (SELECT COUNT(*) FROM Enrollment
                    WHERE Enrollment.TravelPackageId = TravelPackage.id)
                    `),
                    'total',
                ],
            ],
        });
        res.json(travelPackages);
    } catch (error) {
        console.error('Error counting travel packages:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getTravelPackages,
    addTravelPackage,
    getQuantityOfUsersByTravelPackage
};