import './styles/main.scss';
import 'whatwg-fetch';

let newsUrlParam = 'top-headlines?sources=bbc-news,the-next-web,the-verge' ;
const apiKey = 'b8d411a4e22745308fab1a665115c094';
let searchNewsParam = '';

let getWrapperForNews = document.querySelector('.body__news-posts');

const getNewsUrl = (e) => {
    let deletingElem = document.querySelector('ul');
    deletingElem.remove();
    e = e || window.event;
    e = e.target || e.srcElement;
    if (e.id === "1") {
        console.log(e.id);
         newsUrlParam = 'top-headlines?sources=bbc-news,the-next-web,the-verge';
    } else  if (e.id === "2") {
        console.log(e.id);
         newsUrlParam = 'top-headlines?category=sport';
    }
    else  if (e.id === "3") {
        console.log(e.id);
         newsUrlParam = 'top-headlines?category=music';
    }
    else  if (e.id === "4") {
        console.log(e.id);
         newsUrlParam = 'top-headlines?category=business';
    }

    getNews();
    let searchInput = document.querySelector('input');
    searchInput.value = '';
};
document.querySelector('.header__link-news').addEventListener ("click", getNewsUrl, false);

const getNews = () => {
    const newsUrl = `https://newsapi.org/v2/${newsUrlParam}&language=en&apiKey=`;
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
                               
                                    <textarea rows="4" readonly>${item.title ? item.title : " "}</textarea>
                                    <p class="news-time">${item.publishedAt ? item.publishedAt.replace(/[\T\Z]/g, ' ') : " "}</p>
                                
                            </a>
                        </div>`;
        ul.append(li)
    });
    console.log(ul);
    listDiv.append(ul)
};
const getSearchNews = () => {
    let deletingElem = document.querySelector('ul');
    deletingElem.remove();
    let searchInput = document.querySelector('input');
    searchNewsParam = searchInput.value;
    newsUrlParam = `everything?q=${searchNewsParam}`;
    getNews();
};

document.querySelector('.search-news').addEventListener ("keyup", getSearchNews, false);

window.onload = getNews();
console.log('App is ran');