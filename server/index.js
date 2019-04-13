import express from 'express';
import assets from './routes/assets';
import all from './routes/all';
import Loadable from 'react-loadable';

const PORT = process.env.PORT;
const app = express();

app.use(express.static('./src/public'));

app.use('/assets', assets);

app.get('/*', all);

Loadable.preloadAll().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});