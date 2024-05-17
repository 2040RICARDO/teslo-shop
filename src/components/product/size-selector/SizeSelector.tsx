import { Size } from "@/interfaces";

import clsx from "clsx";


interface Props {
    selectedSize?: Size;//dice que va ha ser de tipo Size de las interfaces
    availableSizes: Size[];  // ['SX', 'M', 'XL', 'XXL']//Recibe de los parametors las tallas disponibles de cada producto
    onSizeChanged:(size:Size) =>void
  }
  
export const SizeSelector = ({ selectedSize, availableSizes,onSizeChanged }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>
      <div className="flex">
        {
          availableSizes.map( size => (
            <button 
            onClick={()=>onSizeChanged(size)}
              key={ size }
              className={
                clsx(//cuando la persona pase el mause sobre el texto se coloca una linea debajo
                  "mx-2 hover:underline text-lg",
                  {
                    'underline': size === selectedSize
                  }
                )
              }
            >
              { size }
            </button>
          ))
        }
      </div>
    </div>
  )
}

