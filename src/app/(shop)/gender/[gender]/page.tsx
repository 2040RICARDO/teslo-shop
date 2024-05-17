
export const revalidate =false;//no sirve para volver a cargar la pagina cada 60 seg,¿. es decir que se va a mantener en cache 60 segundos


import { getPaginatedProductWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

import { initialData } from "@/seed/seed";
import { Gender } from "@prisma/client";
import {  redirect } from "next/navigation";


const seedProducts=initialData.products;
interface Props{
  params:{
    gender:string;
  },
  searchParams:{//recibe los paramentos enviados desde la url o los query
    page?:string,
  }
}


export default async function  GenderByPage({params,searchParams}:Props) {


  const {gender}=params;

  const page = searchParams.page?parseInt(searchParams.page):1;

  const {products,currentPage,totalPages}= await getPaginatedProductWithImages({page,gender:gender as Gender});//productos de la baase de datos

  //Si no hay productos redireccionamos a la principal pagina 1 y take:12
  if(products.length == 0){
    redirect(`/gender/${gender}`);
  }






  const label:Record<string,string> = {//Es para un tipado estricto que va ser de tipo ValidCategories y string de interface si no marca error
    'men':'Para Hombres',
    'women':'Para Mujeres',
    'kid':'Para Niños',
    'unisex':'Para Todos',
  }
 /*  if(id === 'kids'){//si el paramentro no es niño o un parametro permitido  me botara la pagina del error
    notFound();//cuando bota el error esto ya no prosigue se queda ahi no est necesario un return null
  } */

  return (
    <>
       <Title title={`Articulos ${label [gender]}`} subtitle="Todos los productos" className="mb-2"/>
       <ProductGrid products={products}/>

       <Pagination  totalPages={totalPages} />
    </>
  );
}