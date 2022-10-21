import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Form.css'

const CryptoEdit = (user) => {

    const [cryptoName, setCryptoName] = useState('');
    const [cryptoQuantity, setcryptoQuantity] = useState(0);
    const navigate = useNavigate();
    const {id} = useParams();

    const [cryptoList, setCryptoList] = useState([])

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true')
        .then((res) => {
            const list = []
            res.data.map((crypto) => list.push(crypto.id))
            setCryptoList(list)
        }).catch(err => console.log(err, "error in getting cryptos"))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/cryptowatcher/${id}`)
        .then((res) => {
            setCryptoName(res.data.CryptoWatcher.cryptoName);
            setcryptoQuantity(res.data.CryptoWatcher.cryptoQuantity);
            console.log(res);
            
        }).catch(err => console.log("Error in getting data",err));
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        axios.put(`http://localhost:8000/api/cryptowatcher/${id}`, {
            cryptoName,
            cryptoQuantity
        }).then(res => {
            console.log(res);
            console.log(res.data);
            navigate(`/list/:${user.username}`);})
            .catch(err => {console.log("Error on submission", err)});

    }

  return (
    <form onSubmit={onSubmitHandler}>
        <p>
        <label className='stuff'>Crypto Name</label>
            <select className='stuff' value={cryptoName} name = "cryptoName" onChange={(e) => setCryptoName(e.target.value)}>
                {cryptoList.map((name) => {
                    return(
                        <option>{name}</option>
                    )
                })}
            </select>
        </p>
        <p>
            <label className='stuff'>Crypto Amount</label>
            <input className='stuff' type= 'number' step= '0.00000001' value = {cryptoQuantity} onChange = {(e)=>setcryptoQuantity(e.target.value)}/>
        </p>
        <p>
        <button style = {{fontSize: '1.2em'}}>Change the Crytpo</button>
        </p>
    </form>
  )
}

export default CryptoEdit;
