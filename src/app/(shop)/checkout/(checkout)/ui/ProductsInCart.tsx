'use client'

import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils";
import Image from "next/image";

import { useEffect, useState } from "react";

export const ProductsInCart = () => {

const productsInCart = useCartStore(state => state.cart);
const [loaded, setLoaded] = useState(false) //este se aplica para evitar el problema de reHidratacion de Zustan





    useEffect(() => {
        setLoaded(true)
    }, [])

    if(!loaded){
        return <p>Loading...</p>
    }

    
    
  return (
    <>
        {
              productsInCart.map( (product,index) => (

                <div key={ product.slug +'-'+index} className="flex mb-5">
                  <Image
                    src={ `/products/${ product.image }` }
                    width={ 100 }
                    height={ 100 }
                    style={{  
                      width: '100px',
                      height: '100px'
                    }}
                    alt={ product.title }
                    className="mr-5 rounded"
                  />

                  <div>
                    <span >
                       {product.size} - { product.title } {product.quantity}
                    </span>
  
                    <p className="font-bold">{currencyFormat(product.price * product.quantity) }</p>

          
                  </div>

                </div>


              ))
            }
    </>
  )
}


