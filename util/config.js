const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    mongoDBUri: process.env.API_URL,
    sendgridApiKey: process.env.SEND_GRID_API_KEY,
};