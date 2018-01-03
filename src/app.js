import './styles/main.scss';
import 'whatwg-fetch';

let newsUrlParam = 'top-headlines?sources=bbc-news,the-next-web,the-verge' ;
const apiKey = 'b8d411a4e22745308fab1a665115c094';
const newsUrl = `https://newsapi.org/v2/${newsUrlParam}&apiKey=`;

//const newsUrl = 'https://newsapi.org/v2/top-headlines?category=sport&language=en&apiKey=';

let getWrapperForNews = document.querySelector('.body__news-posts');

const getNewsUrl = () => {
        console.log(event.target.text)
}
const getCommonNewsUrl = () => {
    return newsUrlParam = 'top-headlines?sources=bbc-news,the-next-web,the-verge'
};

const getNews = () => {
    fetch(`${newsUrl}${apiKey}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            newsList(getWrapperForNews, data.articles)
        })
        .catch(error => {
            console.log('error', error);
        })
};

const newsList = (listDiv, news) => {
    console.log(news);
    let ul = document.createElement('ul');
    news.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = `<div >
                            <a href=${item.url} target="_blank">
                                <img src=${item.urlToImage} alt=${item.title}>
                                <p>
                                    <p>${item.title ? item.title : " "}</p>
                                    <p class="news-time">${item.publishedAt ? item.publishedAt.replace(/T/g, ' ').replace(/Z/g, ' ') : " "}</p>
                                </p>
                            </a>
                        </div>`
        ul.append(li)
    });
    console.log(ul);
    listDiv.append(ul)
};

window.onload = getNews();
console.log('App is ran');