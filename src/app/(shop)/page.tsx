export const revalidate =false;//no sirve para volver a cargar la pagina cada 60 seg,¿. es decir que se va a mantener en cache 60 segundos

import { getPaginatedProductWithImages } from "@/actions";
import { Pagination, ProductGrid } from "@/components";
import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import { redirect } from "next/navigation";



//const products = initialData.products;//es para probar initial data esto esta estatico por el momento  (productos del archivo seed localmente)


interface Props{
  searchParams:{//recibe los paramentos enviados desde la url o los query
    page?:string,

  }
}

export default async function Home({searchParams}:Props) {
  const page = searchParams.page?parseInt(searchParams.page):1;

  const {products,currentPage,totalPages}= await getPaginatedProductWithImages({page});//productos de la baase de datos

  //Si no hay productos redireccionamos a la principal pagina 1 y take:12
  if(products.length == 0){
    redirect('/');
  }



  return (
    <>
    <Title title="Tienda" subtitle="Todos los productos" className="mb-2"/>

    <ProductGrid products={products}/>


    <Pagination totalPages={totalPages}/>
    </>
  );
}
