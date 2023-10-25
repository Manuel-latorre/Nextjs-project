'use client'

import style from './CardProduct.module.css'
import { Advent_Pro, Abel, Antonio } from "next/font/google"
import Link from 'next/link';


const advent = Advent_Pro({ subsets: ['latin'], weight: ["200", "300", "900"] })
const abel = Abel({ subsets: ['latin'], weight: ['400'] });
const antonio = Antonio({ subsets: ['latin'], weight: ["200", "300"] })
  

export interface ProductProps{
    product: {
    _id: string,
    id: number,
    category: string,
    price: number,
    name: string,
    image: string,
    color: string,
    description: string,    
    brand: string,
    stock: number
    }
}


export default function CardProduct({product}:ProductProps){
    return(
        <div className={style.card}>
            <Link href={`/products/${product._id}`}>
                <img style={{padding:10, margin:'auto'}} src={product.image} alt='product'/>
                <p style={{fontSize: 26, fontWeight: '500'}} className={advent.className}>{product.name}</p>
                <p className={abel.className}>${product.price}</p>
                <p className={antonio.className}>COMPRAR</p>
            </Link>
        </div>
    )
}