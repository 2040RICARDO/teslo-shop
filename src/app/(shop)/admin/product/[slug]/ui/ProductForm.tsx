"use client";

import { createUpdateProduct, deleteProductImage } from "@/actions";
import { ProductImage } from "@/components";
import {  Categorys, Product, ProductImage as ProductWithImage } from "@/interfaces";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

interface Props {
product: Partial<Product> & { ProductImage?: ProductWithImage[] };//Adicionalmente va a tener un producto es decir que adicionalmente se esta añadientdo una interfaz al producto se crea otra interfaz el product.interface el Partial inca que todas sus propiedades pueden ser nulas ppor que el formulario es de creacion este viene todos nulos
  categories:Categorys[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

//LOS  CAMPOS DEL FORMULARIO
interface FormInputs {
    title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;
  images?: FileList;//listado de objetos
}
//LOS  CAMPOS DEL FORMULARIO



export const ProductForm = ({ product,categories }: Props) => {
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { isValid },
        getValues,//los valores de los campos para ver los valores actuales del form
        setValue,
        watch,//le dice cuando tiene que volver a renderizarse cuando hay un cambio en el formulario

    }=useForm<FormInputs>({
        //colocamos los defaul values
        defaultValues: {
            ...product,
            tags: product.tags?.join(", "),
            sizes: product.sizes ?? [],
      
            images: undefined,//sale error si o si necesita su valor por defecto
        },
    })

    watch("sizes");//incaca que rendirice el form si el size cambia
    

    const onsubmit = async(data:FormInputs) =>{
        const formData = new FormData();

        const { images, ...productToSave } = data;

        if ( product.id ){
            formData.append("id", product.id ?? "");
        }
        
        formData.append("title", productToSave.title);
        formData.append("slug", productToSave.slug);
        formData.append("description", productToSave.description);
        formData.append("price", productToSave.price.toString());
        formData.append("inStock", productToSave.inStock.toString());
        formData.append("sizes", productToSave.sizes.toString());
        formData.append("tags", productToSave.tags);
        formData.append("categoryId", productToSave.categoryId);
        formData.append("gender", productToSave.gender);
        
        //Si hay imagenes se almacenanen el form data
        if ( images ) {
            for ( let i = 0; i < images.length; i++  ) {
                formData.append('images', images[i]);
            }
        }
        //Si hay imagenes se almacenanen el form data



        const { ok, product:updatedProduct } = await createUpdateProduct(formData);

        if ( !ok ) {
            alert('Producto no se pudo actualizar');
            return;
        }

        router.replace(`/admin/product/${ updatedProduct?.slug }`)
    }   










    const onSizeChanged = (size: string) => {
        //se puede hacer con setValue de reac hook forms
        const sizes = new Set(getValues("sizes")) //el Set es como un arreglo que no acepta duplicados;
        sizes.has(size) ? sizes.delete(size) : sizes.add(size);
        //se cambia el valor con el setValue
        setValue("sizes", Array.from(sizes));
      };
    

  return (
    <form onSubmit={handleSubmit(onsubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("gender", { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoryId", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">

      <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>
        {/* As checkboxes */}
        <div className="flex flex-col">

          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                onClick={() => onSizeChanged(size)}
                className={clsx(
                  "p-2 border cursor-pointer rounded-md mr-2 mb-2 w-14 transition-all text-center",
                  {
                    "bg-blue-500 text-white": getValues("sizes").includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>


          <div className="flex flex-col mb-2">

            <span>Fotos</span>
            <input 
              type="file"
              {...register('images')}
              multiple 
              className="p-2 border rounded-md bg-gray-200" 
              accept="image/png, image/jpeg, image/avif "
            />

          </div>
            {/* SE ESTA LISTANDO LAS IMAGENES */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <ProductImage
                  alt={product.title ?? ""}
                  src={ image.url }
                  width={300}
                  height={300}
                  className="rounded-t shadow-md"
                />

                <button
                  type="button"
                  onClick={() => deleteProductImage(image.id, image.url)}
                  className="btn-danger w-full rounded-b-xl"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};