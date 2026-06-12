const User = require('../models/User');
const Curso = require('../models/Cursos');
const Enrollment = require('../models/Enrollment');

User.hasMany(Enrollment, { foreignKey: 'userId' });
Enrollment.belongsTo(User, { foreignKey: 'userId' });

Curso.hasMany(Enrollment, { foreignKey: 'cursoId' });
Enrollment.belongsTo(Curso, { foreignKey: 'cursoId' });

module.exports = { User, Curso, Enrollment };
