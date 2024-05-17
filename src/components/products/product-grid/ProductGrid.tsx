import { Product } from "@/interfaces"
import { ProductGridItem } from "./ProductGridItem";

interface Props{
    products:Product[];//es un arreglo del tipo de la interfas del producto es como el modelo los tipos de datos o los parametros que espera esto es para un tipado estricto
}


export const ProductGrid = ({products}:Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">  
        {
        products.map( product => (
            <ProductGridItem key={product.slug} product={product}/>
        ) )
      }
    </div>
  )
}


{/* <ProductGridItem
            key={ product.slug }
            product={ product }
          /> */}
