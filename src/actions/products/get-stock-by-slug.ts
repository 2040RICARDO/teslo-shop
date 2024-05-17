'use server'

import prisma from "@/lib/prisma";
import { sleep } from "@/utils";

export const getStockBySlug = async(slug:string):Promise<number>=>{ //retorna una promesa de tipo numero
    try {

        //sleep(3);

        const stock =await prisma.product.findFirst({
            where:{
                slug:slug,
                
            },
            select:{
                inStock:true
            }
        });

        return stock?.inStock ?? 0;
        
    } catch (error) {
        return 0;
    }
}