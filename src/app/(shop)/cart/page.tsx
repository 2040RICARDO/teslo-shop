import Link from 'next/link';

import Image from 'next/image';
import { redirect } from 'next/navigation';


import { QuantitySelector, Title } from '@/components';
import { initialData } from '@/seed/seed';
import { ProductsInCart } from './ui/ProductsInCart';

import { OrderSumary } from './ui/OrderSumary';


const productsInCart = [
  initialData.products[ 0 ],
  initialData.products[ 1 ],
  initialData.products[ 2 ],
];


export default function CartPage() {

  

  //si el carrito esta vacio redirije a la pantalla de empty carrito vacio
  //redirect('/empty');




  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">

        <Title title='Carrito' />


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */ }
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href="/" className="underline mb-5">
              Continúa comprando
            </Link>
         


            {/* Items */ }
            <ProductsInCart/>
          </div>




          {/* Checkout - Resumen de orden  ajusta al contenido h-fit card*/ }
          <OrderSumary/>
          
          
        </div>
      </div>
    </div>
  );
}