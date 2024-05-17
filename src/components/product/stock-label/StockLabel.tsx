'use client'
import { getStockBySlug } from "@/actions/products/get-stock-by-slug"
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react"

interface Props{
    slug:string
}


export const StockLabel = ({slug}:Props) => {

  const [Stock, setStock] = useState(0)
  const [isLoading, setisLoading] = useState(true)

useEffect(() => {
  getStock()

}, )
const getStock =async()=>{
  const inStock = await getStockBySlug(slug);
  console.log({inStock})
  setStock(inStock)
  setisLoading(false)
}



  return (
    <>
    {
      isLoading ?
      (
        <h1 className={ ` ${ titleFont.className } antialiased font-bold text-lg bg-gray-200 animate-pulse` }>
          &nbsp;
        </h1>
      )
      :
      (
        <h1 className={ ` ${ titleFont.className } antialiased font-bold text-md` }>
            Stock: { Stock }
        </h1>
      )

    }
      

      
    
    </>
    
  )
}


