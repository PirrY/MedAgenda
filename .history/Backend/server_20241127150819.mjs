import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pacientesRoutes from './routes/pacientesRoutes.js';
import doctoresRoutes from './routes/doctoresRoutes.js';
import citasRoutes from './routes/citasRoutes.js';
import recetasRoutes from './routes/recetasRoutes.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/doctores', doctoresRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/recetas', recetasRoutes);
app.use('/api/auth', authRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
