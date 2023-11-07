const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    endpoint: process.env.API_URL,
    sendgridApiKey: process.env.SEND_GRID_API_KEY,
};