export const revalidate=604800 //la pagina sera generada en 7 dias esto es en segundos


import { getProductBySlug } from "@/actions";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";

import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props{
  params:{
    slug:string
  }
}

///COMO COLOCAR EL METADATA DE MANERA DINAMICA///
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      // images: [], // https://misitioweb.com/products/image.png
      images: [ `/products/${ product?.images[1] }`],
    },
  };
}
///COMO COLOCAR EL METADATA DE MANERA DINAMICA///





export  default  async function ProductPage({params}:Props) {

  const {slug} =params;

  const product=await getProductBySlug(slug);

  if(!product){
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 ">
       {/* Slideshow */ }
      <div className="col-span-1 md:col-span-2 ">

        {/* Movil */}


        {/* "block md:hidden" es la condicion en pantallas mediadas es hidden */}
        <ProductMobileSlideshow className="block md:hidden" images={product.images} title={product.title} />



        {/* Escritorio */}
         {/* "hidden md:block" es la condicion en pantallas mediadas es hidden */}
        <ProductSlideshow className="hidden md:block" images={product.images} title={product.title} />

      </div>


      {/* Detalles */ }
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug}/>
        
        <h1 className={ ` ${ titleFont.className } antialiased font-bold text-xl` }>
          { product.title }
        </h1>


        <p className="text-lg mb-5">${ product.price }</p>

        <AddToCart product={product}/>
 


        




        {/* Descripción */ }
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          { product.description }
        </p>


      </div>
    </div>
  );
}