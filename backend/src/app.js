const { Dictionary } = require('./dictionary');
const { handleGetPartial } = require('./handlers');
const express = require('express');
const cors = require('cors');

const dictionary = new Dictionary('../dictionary.json');
const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(cors()); // just for testing, remove once we have env variables

app.get('/partials/:partial', handleGetPartial(dictionary));

app.listen(Number(PORT), () => console.log(`Listening @ port ${PORT}.`));
