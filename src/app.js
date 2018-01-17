import './styles/main.scss';
import 'whatwg-fetch';

let newsUrlParam = 'top-headlines?sources=bbc-news,the-next-web,the-verge';
const apiKey = 'b8d411a4e22745308fab1a665115c094';
let searchNewsParam = '';
let pageNumberParam = '1';

let getWrapperForNews = document.querySelector('.body__news-posts');
let getWrapperForPages = document.querySelector('.pagination');

const clearParam = () => {
    let deletingElem = document.querySelector('ul');
    if (deletingElem !== null) {
        deletingElem.remove();
    }
    let wrapperForPage = document.querySelector('.wrapperForPage');
    if (wrapperForPage !== null) {
        wrapperForPage.remove();
    }
    let qoutL = document.querySelector('.qoutL');
    if(qoutL !== null) {
        qoutL.remove()
    }
    let qoutR = document.querySelector('.qoutR');
    if(qoutR !== null) {
        qoutR.remove()
    }
    let getActive = document.querySelector('.active');
    if(getActive !== null) {
        getActive.className=''
    }
};

const getNewsUrl = (e) => {
    clearParam();
    e = e || window.event;
    e = e.target || e.srcElement;
    e.className='active';
    if (e.id === "1") {
        console.log(e);
        newsUrlParam = 'top-headlines?sources=bbc-news,the-next-web,the-verge';
    } else if (e.id === "2") {
        console.log(e.id);
        newsUrlParam = 'top-headlines?category=sport';
    }
    else if (e.id === "3") {
        console.log(e.id);
        newsUrlParam = 'top-headlines?category=music';
    }
    else if (e.id === "4") {
        console.log(e.id);
        newsUrlParam = 'top-headlines?category=business';
    }

    getNews();
    let searchInput = document.querySelector('input');
    searchInput.value = '';
};
document.querySelector('.header__link-news').addEventListener("click", getNewsUrl, false);

const getNews = () => {
    const newsUrl = `https://newsapi.org/v2/${newsUrlParam}&language=en&pageSize=20&page=${pageNumberParam}&apiKey=`;
    fetch(`${newsUrl}${apiKey}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            newsList(getWrapperForNews, data.articles);
            createPagination(getWrapperForPages, data.totalResults)
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
                                <img src=${item.urlToImage ? item.urlToImage : "./assets/image/news.jpg"} alt=${item.title}> 
                               
                                    <textarea rows="4" readonly>${item.title ? item.title : " "}</textarea>
                                    <p class="news-time">${item.publishedAt ? item.publishedAt.replace(/[\T\Z]/g, ' ') : " "}</p>
                                
                            </a>
                        </div>`;
        ul.append(li)
    });
    console.log(ul);
    listDiv.append(ul)
};

const createPagination = (listPages, pages) => {
    let count = 1;
    let pagesAmount = Math.floor(pages / 20);
    let div = document.createElement('div');
    div.className = 'wrapperForPage';
    let qoutL = document.createElement('a');
    qoutL.className="qoutL";
    qoutL.setAttribute('href', '#');
    qoutL.innerHTML = '&laquo;';
    let qoutR = document.createElement('a');
    qoutR.className="qoutR";
    qoutR.setAttribute('href', '#');
    qoutR.innerHTML = '&laquo;';
    qoutR.innerHTML ='&raquo;';
    let arr = [];
    for (let i = 0; i <= pagesAmount; i++) {
        arr.push(count);
        count += 1;
        let a = document.createElement('a');
        a.setAttribute('href', '#');
        a.setAttribute('id', `${i+1}`);
        a.innerHTML = `${arr[i]}`;
        div.append(a);
    }
    listPages.append(qoutL);
    listPages.append(div);
    listPages.append(qoutR);
};

const getSearchNews = (e) => {
    if (e.keyCode === 13) {
        clearParam();
        let searchInput = document.querySelector('input');
        searchNewsParam = searchInput.value;
        newsUrlParam = `everything?q=${searchNewsParam}`;
        getNews();
    }

};

document.querySelector('.search-news').addEventListener("keyup", getSearchNews, false);

const getActivePage = (event) => {
    clearParam();
    event = event || window.event;
    event = event.target || e.srcElement;
    console.log(event.id);
    pageNumberParam = event.id;
    getNews();
    event.stopPropagation();
    console.log(document.getElementById(`${pageNumberParam}`))
   /* const activeElem=document.getElementById(`${pageNumberParam}`);
    activeElem.className = 'active';*/

};

getWrapperForPages.addEventListener("click", getActivePage, false);

window.onload = getNews();
console.log('App is ran');