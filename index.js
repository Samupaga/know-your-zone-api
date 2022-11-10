require('dotenv').config();

const api = require('./api.js');

api.listen(process.env.PORT, () => {
    console.log(`api is listening on port ${process.env.PORT}... :)`);
})
