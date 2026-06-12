const Enrollment = require('../models/Enrollment');
const Curso = require('../models/Cursos');

exports.inscrever = async (req, res) => {
    try {
        const userId = req.user.id;
        const { idCurso } = req.params;
        const cursoId = Number(idCurso);

        if (!Number.isInteger(cursoId) || cursoId <= 0) {
            return res.status(400).json({ message: 'ID de curso invalido' });
        }

        const curso = await Curso.findByPk(cursoId);
        if (!curso) return res.status(404).json({ message: 'Curso não encontrado' });

        const existe = await Enrollment.findOne({ where: { userId, cursoId } });
        if (existe) return res.status(409).json({ message: 'Você já está inscrito neste curso' });

        await Enrollment.create({ userId, cursoId });
        res.status(201).json({ message: 'Inscrição realizada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inscrever', error: error.message });
    }
};

exports.cancelar = async (req, res) => {
    try {
        const userId = req.user.id;
        const { idCurso } = req.params;
        const cursoId = Number(idCurso);

        if (!Number.isInteger(cursoId) || cursoId <= 0) {
            return res.status(400).json({ message: 'ID de curso invalido' });
        }

        const inscricao = await Enrollment.findOne({ where: { userId, cursoId } });
        if (!inscricao) return res.status(404).json({ message: 'Inscrição não encontrada' });

        await inscricao.destroy();
        res.json({ message: 'Inscrição cancelada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cancelar', error: error.message });
    }
};

exports.minhasInscricoes = async (req, res) => {
    try {
        const userId = req.user.id;

        const cursos = await Curso.findAll({
            include: [{
                model: Enrollment,
                where: { userId },
                attributes: []
            }],
            order: [['inicio', 'ASC']]
        });

        res.json({
            total: cursos.length,
            cursos
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar inscrições', error: error.message });
    }
};