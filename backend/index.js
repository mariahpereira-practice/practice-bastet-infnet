const express = require('express');
const conn = require('./database/conn');

const app = express();

const travelPackageRoutes = require('./routes/travelPackRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const userRoutes = require('./routes/usersRoutes');
const authenticationRoutes = require('./routes/authenticationRoutes');

app.use(
    express.urlencoded({extended: true})
);

app.use(express.json());

app.use('/travelPackages', travelPackageRoutes);
app.use('/enrollments', enrollmentRoutes);
app.use('/users', userRoutes);
app.use('/login', authenticationRoutes);

app.use('/', (req, res) => {
    res.json({message: 'API', endpoints: [
        'GET /travelPackages',
        'POST /travelPackages',
        'GET /users',
        'POST /users',
        'GET /enrollments',
        'POST /login',
    ]})
});

conn.sync({force: false}).then(() => {
    console.log('sync OK');
    app.listen(3333, () => {
        console.log('Server is running');
    })
    }).catch((err) => {
        console.log('Error: ' + err);
    });

