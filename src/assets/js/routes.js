// 此处是路由的配置文件
import WorldNews from '../../components/body/worldNews.vue';
import Book from '../../components/body/book.vue';
import Weather from '../../components/body/weather.vue';
import HistoryToday from '../../components/body/historyToday.vue';

import newsDetail from '../../components/detail/newsDetail.vue';
import bookDetail from '../../components/detail/bookDetail.vue';
let routes=[
	{
		path:'/worldNews/:tableNum',component:WorldNews,
        children:[
            {path:':news_id',component:newsDetail},
        ]
	},
    {
    	path:'/book/:bookName?',component:Book,
    },
    {
    	path:'/weather/:tableNum',component:Weather
    },
    {
        path:'/bookDetail/:id',component:bookDetail
    },
    {
    	path:'',redirect:'/worldNews/1'
    }
];

export default routes;