

import CardProduct from "@/components/Products/CardProduct";
import { Product } from '../page';
import Image from "next/image";
import visa from './visa.png'
import mastercard from './mastercard.png'
import mp from './mp.png'
import style from './Detail.module.css'




async function fetchRelated(): Promise<Product[]> {
    const response = await fetch('https://private-radtek-server.onrender.com/products');
    const data = await response.json();
    return data as Product[]; 
  }


async function fetchId(_id: Product) {
    return await fetch(`https://private-radtek-server.onrender.com/product/${_id}`)
    .then(res => res.json())
  }



export default async function Detail ({params}: any) {
    const {_id} = params

    const prod = await fetchId(_id);
    
    const related = await fetchRelated()

    return (
        <div>
            <div className={style.detail_container}>
                <div className={style.image_container}>
                    <img className={style.imgDetail} alt={prod.name} src={prod.image} />
                </div>
                <div className={style.prodcutData_container}>
                    <h1 className={style.name}>{prod.name}</h1>
                    <p className={style.price}>${prod.price}</p>
                    <p className={style.cuotas}>3 cuotas sin interes de $6000</p>
                    <p style={{color:'red', margin:10}}>2 unidades restantes</p>
                    <div className={style.checkoutMethods}>
                        <Image style={{width: 40, height:40}} src={visa} alt="visa"/>
                        <Image style={{width: 40, height:40}} src={mastercard} alt="mastercard"/>
                        <Image style={{width: 40, height:40}} src={mp} alt="mercado pago"/>
                    </div>
                    <div>
                        <button className={style.button}>
                            COMPRAR
                        </button>
                    </div>
                </div>
            </div>
            <div className={style.description}>
                <p className={style.descriptionTitle}>{prod.name} - Descripción</p>
                <p>{prod.description}</p>
            </div>
            <p className={style.relatedTtile} style={{textAlign:'center', fontSize: 32, fontWeight:'bold', marginTop: 50}}>Productos relacionados</p>
            <div className={style.relatedProducts}>
            {
                 related.slice(0, 3).map((prod) => (
                    <CardProduct product={prod} key={prod._id}/>
                ))
            }
                
            </div>
        </div>
    )
}