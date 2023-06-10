import React,{useEffect,useState} from React;
import axios from 'axios';

const QrCodeScanner = () =>{

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const response = await axios.get('http://192.168.6.33:5000/send');
                setResult(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    });
}