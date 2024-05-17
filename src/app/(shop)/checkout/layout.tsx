import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function CheckoutLayout({
 children
}: {
 children: React.ReactNode;
}) {
    ///ESTA PROTECCION DE RUTA SE REALIZA DE ESTA MANERA MAS FACIL PERO TAMBIEN SE HACE CON MIDDLEWARE
    const session = await auth();//optengo la  session del usuario
    if(!session?.user){
        redirect('/auth/login?redirectTo=/checkout/address');
        //redirect('/auth/login?redirect');
    }
  return (
    <>
      {children}
    </>
  );
}