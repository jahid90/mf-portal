const axios = require('axios');

const endpoint = process.env.NAVIGATION_SERVICE;

const getHeader = async () => {
    try {

        const url = `http://${endpoint}/component/header`;

        const response = await axios.get(url);

        return response.data;

    } catch (err) {
        throw err;
    }
};

module.exports = {
    getHeader
};
