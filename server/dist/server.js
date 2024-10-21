import express from 'express';
import routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static('../client/dist'));
app.use(express.json());
app.use(routes);
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
