// Importa Mongoose para gestionar la conexión a MongoDB
const mongoose = require('mongoose');

// Función para conectar a la base de datos MongoDB
const connectDB = async () => {
  try {
    // URI obtenida desde el archivo .env
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('❌ URI de conexión a MongoDB no definida en .env (MONGO_URI)');
    }

    // Conexión a MongoDB con opciones recomendadas
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Conectado exitosamente a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1); // Detiene la app si la conexión falla
  }
};

// Exporta la función para usarla en app.js
module.exports = connectDB;
