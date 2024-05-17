import { auth } from "@/auth.config";
import { redirect } from "next/navigation";


export default async function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {

  const session =await auth();//el auth se exporta de la configuracion

  //console.log({session});//en la session se obtiene todo la informacion de la session del usuario como sus datos y cuando expira la session, la informacion la optiene de las cookies.

  if(session?.user){//sia hay una session redirecciona a la principal
    redirect('/');
  }

  return (
  
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10">
        {children}
      </div>
    </main>
  );
}