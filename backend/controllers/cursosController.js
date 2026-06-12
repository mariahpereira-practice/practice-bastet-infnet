const Cursos = require('../models/Cursos');

const getCursos = async (req, res) => {
    try {
        const cursos = await Cursos.findAll();
        res.json(cursos);
    } catch (error) {
        console.error('Error fetching cursos:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getCursos,
};