const express = require('express');
const movieRoutes = require('./routes/movie.routes');

const app = express();
app.use(express.json());

app.use('/api/movies', movieRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
