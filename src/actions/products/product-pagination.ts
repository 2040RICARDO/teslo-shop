'use server'

import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client";

interface PaginationOptions {
    page?:number,
    take?:number,
    gender?:Gender
}



export const getPaginatedProductWithImages = async({page =1,take=12,gender}:PaginationOptions)=>{

    //validacion si no es un numero o es menos a 0 o es 0
    if(isNaN(Number(page))) page=1;
    if(page < 1) page=1;
    //validacion si no es un numero o es menos a 0 o es 0



    try {
        //1.Obtener los productos

        const products =await prisma.product.findMany({
            take:take,//cantidad
            skip:(page -1) * take,//paginacion
            include:{
                ProductImage:{
                    take:2,
                    select:{
                        url:true
                    }
                }
            },
            //! Por género
            where: {
                gender: gender
            }
        })

        //2.Obtener total de paginas
        //todo:
        const totalCount = await prisma.product.count({
            where: {
                gender: gender
            }
        });
        const totalPages = Math.ceil(totalCount / take);//se obtiene la cantidad de paginas que se debe de crear segun la cantidad de productos



        //LO TRASNSFORMAMOS EN UN OBJETO TAL COMO ESTA EN NUESTRA INTERFAZ 
        return{
            currentPage:page,
            totalPages:totalPages,
            products:products.map(product =>({
                ...product,
                images:product.ProductImage.map(image=> image.url)
            }))
        }

    } catch (error) {
        throw new Error('No se pudo cargar los productos')
    }
}