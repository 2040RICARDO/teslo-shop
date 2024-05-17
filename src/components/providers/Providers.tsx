'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SessionProvider } from 'next-auth/react';


interface Props {
  children: React.ReactNode;
}


export const Providers = ({ children }: Props) => {
  console.log({clientId: process.env.NEX_PUBLIC_PAYPAL_CLIENT_ID ?? ''});

//PayPalScriptProvider SOLO ES CUANDO UTILIZAMOS PAYPAL COMO METODO DE PAGO , si no se utiliza quitar el provider
//intent:'capture' Para capturar los intentos
//currency:"USD" moneda por defecto se pude cambiar al moneto de llamar al boton
  return (
    <PayPalScriptProvider options={{ clientId: 'AdLcS2y5RjsjzoGN0RoiJFWSG7BAkL9QUGZw_pdElZuD_ntTlkqgmoUpcrPC1NziKPxy2aCejp7HvVzq',
    intent:'capture',
    currency:'USD',

    }}
    
    >
    <SessionProvider>
      { children }
    </SessionProvider>
    </PayPalScriptProvider>
  )
}