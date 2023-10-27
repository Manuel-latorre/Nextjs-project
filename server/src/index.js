import express from 'express';
import morgan from 'morgan'
import { ACCESS_TOKEN, PORT } from './config.js';
const app = express()
import cors from 'cors'
import mercadopago from 'mercadopago';


app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

mercadopago.configure({
    access_token: ACCESS_TOKEN,
})

app.get("/", function(req, res){
    res.send("backend maercadopago")
})

app.post("/create_preference", (req, res) => {
    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            },
        ],
        back_urls: {
            success: "http://localhost:8080",
            failure: "http://localhost:8080",
            pending: "http://localhost:8080",
        },
        auto_return: 'approved',
    };

    mercadopago.preferences
    .create(preference)
    .then((response) => {
        res.json({ id: response.body.id });
    })
    .catch(function (error){
        console.log(error);
    })

    console.log(res);
})



app.listen(PORT)


console.log('Server on port', PORT);