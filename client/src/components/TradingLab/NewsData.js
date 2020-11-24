const { default: Axios } = require('axios');

const NewsData = async () => {
    const NewsData = await Axios.get(
        'https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2020-04-30&to=2020-05-01&token=bsh2dt7rh5r9j22quibg'
    );
    return NewsData;
};

export default NewsData;
