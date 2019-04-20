import express from 'express';
import assets from './routes/assets';
import all from './routes/all';
import Loadable from 'react-loadable';

// getting PORT from `.env` file in root directory
const PORT = process.env.PORT;
const app = express();

// adding a route for serving project static assets
app.use(express.static('./src/public'));

// handle boilerplate static assets
app.use('/assets', assets);

// handle other routes
app.get('/*', all);

Loadable.preloadAll().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});