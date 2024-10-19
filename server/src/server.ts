
import express from 'express';

import routes from './routes/index.js';



// Import the routes

const app = express();

const PORT = process.env.PORT || 3001;


app.use(express.json());


// TODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
