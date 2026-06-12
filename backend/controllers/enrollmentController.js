const Enrollment = require('../models/Enrollment');
const TravelPackage = require('../models/TravelPackage');
const User = require('../models/User');

const getEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.findAll();
        res.json(enrollments);
    } catch (error) {
        console.error('Error fetching enrollments:', error);
        res.status(500).json({ error: 'An error occurred while fetching enrollments.' });
    }
};

const addEnrollment = async (req, res) => {
    try {
        const UserId = req.body.UserId;
        const TravelPackageId = req.body.TravelPackageId;

        if (!UserId || !TravelPackageId) {
            return res.status(400).json({ error: 'UserId and TravelPackageId are required.' });
        }

        const user = await User.findByPk(UserId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const travelPackage = await TravelPackage.findByPk(TravelPackageId);
        if (!travelPackage) {
            return res.status(404).json({ error: 'Travel package not found.' });
        }

        if (travelPackage.remainingVacancies > 0) {
            travelPackage.remainingVacancies -= 1;
            await travelPackage.save();
            const enrollment = await Enrollment.create({ UserId, TravelPackageId });
            res.json(enrollment);
        } else {
            return res.status(400).json({ error: 'No remaining vacancies for this travel package.' });
        }
    } catch (error) {
        console.error('Error adding enrollment:', error);
        res.status(500).json({ error: 'An error occurred while adding the enrollment.' });
    }
};

module.exports = {
    getEnrollments,
    addEnrollment,
};