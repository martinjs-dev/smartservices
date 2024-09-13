import { useEffect, useState } from 'react'
import axios from 'axios'

function AppNews() {
  const [news, setNews] = useState([]);

  useEffect(() =>{
    axios.get('http://localhost:3000/api-news')
    .then((response)=>{
      setNews(response.data.articles);
    //   console.log(response.data.articles)
    })
    .catch((error) => {
      console.error('Failed to fetch data:', error);
    });
  }, [news]);

  const newsList = news.map((item) => <p key={item.url}>Titre:{item.title}</p>);
  return (
      <div className='App'>
        <h1>NEWS</h1>
        <ul>
           {newsList}
        </ul>
      </div>
  )
}

export default AppNews
