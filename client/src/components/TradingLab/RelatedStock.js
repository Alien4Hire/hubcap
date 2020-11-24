import querystring from 'querystring';

const { default: Axios } = require('axios');

const RelatedStock = async (industry) => {
    const ApiString = `http://localhost:3500/v1/symbols/` + industry + `/ind`; //${querystring.stringify(
    const RelatedStock = await Axios.get(ApiString);
    return RelatedStock;
};

export default RelatedStock;
