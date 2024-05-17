import { auth } from "@/auth.config";
import { Title } from "@/components"
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();//optengo la  session del usuario
    if(!session?.user){
        //redirect('/auth/login?returnTo=/perfil');
        redirect('/');
    }

    //se configuro en la raiz auth.config.ts la estructura para que muestre la session completa por que muestra pero marca error es para solucionar eso
  return (
    <div>
        <Title title="Perfil"/>
        <pre>
            {
                JSON.stringify(session.user,null,2)//esto quiere decir que se imprime con salto de linea
            }
            <h3> {session.user.role}</h3>{/* esta en el auth.config.ts para que no marque error */}
        </pre>
    </div>
  );
}