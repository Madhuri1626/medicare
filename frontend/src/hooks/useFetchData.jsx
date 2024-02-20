import {useEffect, useState} from 'react';
import {token} from '../config';
// import { BASE_URL } from '../config';
const useFetchData = (url) => {
    // console.log(token);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true);
            try{
                // const res = await fetch(`${BASE_URL}/users/profile/me`,
                const res = await fetch(url,
                {   
                    method:'get',
                    headers: { 
                        'Content-Type': 'application/json',
                        'x-token': token,
                    }
                })
                const result = await res.json()
                if(!res.ok){
                    throw new Error(result.message + '❗')
                }
                setData(result.data);
                setLoading(false);
            }
            catch(err){
                setLoading(false);
                setError(err.message);
            }
        }
        fetchData()
    }, [url])
  return {
    data, loading, error
  }
}

export default useFetchData
