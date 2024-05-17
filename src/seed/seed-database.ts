//este archivo se ejecuta desde la linea de comandos npm run seed
//este comando se puso en package.json

import { create } from 'zustand';
import { initialData } from './seed';
import prisma from '../lib/prisma';
import { countries } from './seed-countries';



async function main() {

  // 1.ELIMANAR TODOS LOS REGISTROS DE LA TABLA
  // await Promise.all( [
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
  


  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  
  // ]);
  // 1.ELIMANAR TODOS LOS REGISTROS DE LA TABLA
  

  const { categories, products,users } = initialData;


  //  Categorias
  // {
  //   name: 'Shirt'
  // }

  //!CREAR USUARIOS ///////////////7
  await prisma.user.createMany({
    data: users
  });
   //!CREAR USUARIOS ///////////////7

   //!INSERTAR PAISES O CUNTRY
   await prisma.country.createMany({
    data: countries
  });
    //!INSERTAR PAISES O CUNTRY

  //////////! INSERTAR CATEGORIAS A LA BASE DE DATOS /////////////
  const categoriesData = categories.map( (category) => ({ name:category }));//retorna un objeto directamente
  
  await prisma.category.createMany({
    data: categoriesData
  });
//////////! INSERTAR CATEGORIAS A LA BASE DE DATOS /////////////

  
//////////!OBTENER LAS CATEGORIAS DE LOS PRODUCTOS ////////////
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce( (map, category) => {
    map[ category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); //<string=shirt(NOMBRE), string=categoryID(ID)>
  //////////!OBTENER LAS CATEGORIAS DE LOS PRODUCTOS //////////
  

  // Productos
 ////!REGISTRAR PRODUCTO/////////////////////
  products.forEach( async(product) => {

    const { type, images, ...rest } = product;
   
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })
    

    //! REGISTAR IMAGENES CON EL ID DEL PRODUCTO INSERTADO///// 
    // Images
    const imagesData = images.map( image => ({
      url: image,
      productId: dbProduct.id
    }));

    await prisma.productImage.createMany({
      data: imagesData
    });
    //! REGISTAR IMAGENES CON EL ID DEL PRODUCTO INSERTADO///// 

  });
  ////!REGISTRAR PRODUCTO/////////////////////





  console.log( 'Seed ejecutado correctamente' );
}









( () => {

  if ( process.env.NODE_ENV === 'production' ) return;
  main();
} )();