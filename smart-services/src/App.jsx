import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [news, setNews] = useState([]);

  useEffect(() =>{
    axios.get('http://localhost:3000/api-news')
    .then((response)=>{
      setNews(response.data);
      console.log(response.data)
    })
    .catch((error) => {
      console.error('Failed to fetch data:', error);
    });
  }, []);

  return (
    <>
      <div className='App'>
        <h1>NEWS</h1>
        <ul>
          {news.map((news)=>(
            <li key={news.articles.source.id}>
              {news.articles.title} 
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
