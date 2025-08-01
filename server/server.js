/* IMPORT DEPENDENCIES */
const express = require('express'); /* Installs the Express Framework. */
const cors = require('cors'); /*  */
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
global.Vocab = require('./api/models/vocabModels');
const routes = require('./api/routes/vocabRoutes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://curtisbottleton1:vutuannghia422005@cluster0.trb0o23.mongodb.net/', 
    {useNewUrlParser: true}
);

const port = process.env.port || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);
app.listen(port);
app.use((req, res) => {
    res.status(404).send({url: `${req.originalUrl} Not found.` });
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

console.log(`Server started on port ${port}`);