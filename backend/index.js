const express = require('express');
const conn = require('./database/conn');

const app = express();

const userRoutes = require('./routes/usersRoutes');
const authenticationRoutes = require('./routes/authenticationRoutes');
const cursosRoutes = require('./routes/cursosRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

require('./models/associations');

app.use(
    express.urlencoded({extended: true})
);

app.use(express.json());

app.use('/usuarios', userRoutes);
app.use('/login', authenticationRoutes);
app.use('/cursos', cursosRoutes);
app.use('/inscricoes', enrollmentRoutes);


app.use('/', (req, res) => {
    res.json({message: 'API', endpoints: [
        {method: 'POST', path: '/usuarios', description: 'Criar um novo usuário'},
        {method: 'POST', path: '/login', description: 'Autenticar um usuário'},
        {method: 'GET', path: '/cursos', description: 'Listar todos os cursos'},
        {method: 'POST', path: '/inscricoes/:idCurso', description: 'Fazer Inscrição em um curso'},
        {method: 'DELETE', path: '/inscricoes/:idCurso', description: 'Cancelar Inscrição em um curso'},
        {method: 'GET', path: '/inscricoes', description: 'Listar os cursos de um usuário específico'}
    ]})
});

conn.sync({alter: true}).then(() => {
    console.log('sync OK');
    app.listen(3333, () => {
        console.log('Server is running');
    })
    }).catch((err) => {
        console.log('Error: ' + err);
    });

