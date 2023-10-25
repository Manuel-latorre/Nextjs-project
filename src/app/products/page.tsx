'use client'


import CardProduct from "@/components/Products/CardProduct";
import { useEffect, useState } from "react";
import style from './Products.module.css'


export interface Product {
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


async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('https://private-radtek-server.onrender.com/products');
  const data = await response.json();
  return data as Product[]; 
}


export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
    
    fetchProducts()
    .then((data) => setProducts(data));
  }, []);

  return(
    <div>
        <h1 style={{textAlign:'center', fontSize:28}}>PRODUCTS</h1>
        <div className={style.cards_container}>
          {
            products.map((prod) => (
                <CardProduct product={prod} key={prod._id}/>
            ))
          }
        </div>

      </div>
  )
}