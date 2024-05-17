import prisma from "@/lib/prisma";

export const getProductBySlug =async(slug:string)=>{
    try {
        const product =await prisma.product.findFirst({
            include:{
                ProductImage:{
                    select:{
                        id:true,
                        url:true,
                        productId:true,
                    }
                }
            },
            where:{
                slug:slug,
            }
        })
        if(!product) return null

        //const {ProductImage,...resp}=product;//esto es para quitar Product Image del producto

        return {
            ...product,
            images:product.ProductImage.map(image=> image.url)
        }


    } catch (error) {
        console.log(error);
        throw new Error('Producto no encontrado');
    }
}