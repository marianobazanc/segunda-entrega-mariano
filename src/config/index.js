const { connect } = require('mongoose');

async function connectDB() {
    try {
        await connect('mongodb+srv://marianobazan:BV6VACa3HxMREyxK@cluster0.7a9jo6i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Base de datos conectada');
    } catch (error) {
        console.log('Error al conectar a la base de datos:', error);
    }
}

module.exports = connectDB;
