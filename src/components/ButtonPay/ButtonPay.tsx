'use client'

import{ useState } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios'
import style from './ButtonPay.module.css'

const {PUBLIC_KEY_MERCADOPAGO} = process.env

export default function ButtonPay ()  {

    const [ preferenceId, setPreferenceId ]  = useState(null);
    
    initMercadoPago(PUBLIC_KEY_MERCADOPAGO as string);

    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:8080/create_preference", {
                description: 'prod 1',
                price: 100,
                quantity: 1,
                currency_id: 'ARS'
            })
            const {id} = response.data;
            return id;
        } catch (error) {
            console.log(error);
        }
    }

    const handleBuy = async () => {
        const id = await createPreference();
        if(id) setPreferenceId(id);
    }

    return (
        <div>
            <button className={style.button} onClick={handleBuy}>COMPRAR</button>
            {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>

    )
}