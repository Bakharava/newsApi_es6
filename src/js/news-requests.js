import 'whatwg-fetch';

const apiKey = 'b8d411a4e22745308fab1a665115c094';
const newsUrl = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=';

getNews =() => {
    fetch(`${newsUrl}${apiKey}`)
        .then(res => {
            return res.json
        })
        .then(data => {
            let news = data;
            console.log(news);
        })
        .catch(error => {
            console.log('error', error);
        })
};

export default getNews;