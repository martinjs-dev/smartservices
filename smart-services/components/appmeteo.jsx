import { useEffect, useState } from 'react'
import axios from 'axios'

function AppMeteo() {
    const [meteo, setMeteo] = useState({});


    useEffect(() => {
        try {
            axios.get('http://localhost:3000/api-meteo')
                .then((response) => {
                    setMeteo(response.data);
                    console.log(response.data)
                    //   console.log(Array.isArray(meteo))

                })
                .catch((error) => {
                    console.error('Failed to fetch data:', error);
                });
        } catch (error) {

            setMeteo(error);
        }


    }, [meteo]);


    //   const meteoList = meteo.map((item) => <p key={item.id}>Temperature:{item.temp}</p>);
    return (

        <div className='App'>
            {/* {
                meteo && meteo.map((item) => {
                    <div key={item.id}>
                        <p>{item.name}</p>
                    </div>
                })
            } */}
            {/* <h1>{meteo.work.title}</h1> */}
            {/* <h1>{meteo? meteo.main.temp : "No data here"}</h1> */}


            {/* <h1>{(meteo.main.feels_like)}</h1>
            <h1>{meteo.main.humidity}</h1> */}
            {/* <h1>{meteo.name}</h1> */}
            {/* <ul>
                {meteoList}
            </ul> */}
        </div>
    )
}

export default AppMeteo
