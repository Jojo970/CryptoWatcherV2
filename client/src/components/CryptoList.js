import React, { useState, useEffect, useRef} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client'
import './CryptoList.css'

const CryptoList = (props) => {
    const {username} = useParams()
    const [cryptos, setCryptos] = useState([]);
    const [socket] = useState(() => io(':8000'));
    const [count, setCount] = useState(0);


    
    useEffect(() => {
        socket.on('connection', ()=> {
            console.log('Connected to socket')
        });
        axios.get(`http://localhost:8000/api/crypto-by-user/${username}`, {withCredentials: true})
        .then((res) => {
            console.log(res, username)
            setCryptos(res.data.CryptoWatchers);          
        }).catch(err => console.log(err));

        return () => socket.disconnect(true);
    }, [count]);



    const deleteCrypto = (cryptoID) => {
        axios.delete('http://localhost:8000/api/cryptowatcher/' + cryptoID)
        .then((res) => {
            const newCryptos = cryptos.filter( (crypto) => crypto._id !== cryptoID);
            setCryptos(newCryptos)
            console.log(res)
        }).catch(err => {console.log(err)});

        socket.emit('deleteCrypto', cryptoID)
    }

    socket.on('cryptoDeleted', (deletedCrypto) => {
        setCryptos(cryptos.filter((crypto) => crypto._id !== deletedCrypto))
    });



    const reloadCrypto = () => {
        let listToSend = cryptos[0].cryptoName
        let arrayToSend = [cryptos[0].cryptoName]
        for(let i = 1; i < cryptos.length; i++) {
            listToSend = listToSend + "," + cryptos[i].cryptoName
            arrayToSend = [...arrayToSend, cryptos[i].cryptoName]
        }
        

        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=' + listToSend + '&vs_currencies=usd')
        .then((res) => {
            const priceList = res.data
            for(var i = 0; i < cryptos.length; i++){
                let cryptoPriceToGet = arrayToSend[i]
                let cryptoPrice = priceList[cryptoPriceToGet].usd
                console.log(cryptoPrice)
                axios.put(`http://localhost:8000/api/cryptowatcher/${cryptos[i]._id}`, {
                    cryptoPrice
                }).then(res => {
                    console.log(res.data);})
                .catch(err => {console.log("Error on submission", err)});
                }
            setTimeout(processResponse, 1200)
        }).catch( err => console.log(err, "Error in reloading Prices"))

    };

    const processResponse = () => {
        console.log('callback')
        setCount(count + 1)
    }



    return (
        <div className = "container">
            <div id='reloadColumn'>    
            <p>Click "Reload" to update prices ---></p>
        <button id='reload' onClick={reloadCrypto}>Reload Prices</button>
            </div>
            
            <table>
                <tr>
                    <th>Crytpo Name</th>
                    <th>Current Price USD</th>
                    <th>Amount Owned</th>
                    <th>Owned USD</th>
                    <th>Actions</th>
                    
                </tr>
                {cryptos.map((crypto) => {
                    const name = crypto.cryptoName
                    return(
                        // eslint-disable-next-line react/jsx-key
                        <tr key = {crypto.cryptoName}>
                            <td>{crypto.cryptoName.charAt(0).toUpperCase() + crypto.cryptoName.slice(1)}</td>
                            <td>$ {crypto.cryptoPrice.toFixed(2)} </td>
                            <td>{crypto.cryptoQuantity}</td>
                            <td>$ {(crypto.cryptoQuantity * crypto.cryptoPrice).toFixed(2)}</td>
                            <td>{<Link to = {`/edit/${crypto._id}`}>Edit</Link>} | <button id='action' onClick={() => deleteCrypto(crypto._id)}>Delete</button></td>                            
                        </tr>
                    )
                })}
            </table>
            
        </div>
    )
}

export default CryptoList;