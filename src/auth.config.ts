import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod';//esquema de validacion
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';


const authenticatedRoutes =[
  'checkout/address'
];
 
export const authConfig:NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },


  //estos callback se hace para obtener mas datos de los usuarios estos reciben el token y el usuario esto se ve en la consola al iniciar session 
  callbacks:{
  //ESTO ES PROTECCION DE PAGINAS CON MIDDLEWARE HAY UNA FORMA DIRECTA EN EL LAYOUT DE CHECKOUT///
    authorized({ auth, request: { nextUrl } }) {
      console.log({ auth });
      // const isLoggedIn = !!auth?.user;

      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      return true;
    },
      //ESTO ES PROTECCION DE PAGINAS CON MIDDLEWARE HAY UNA FORMA DIRECTA EN EL LAYOUT DE CHECKOUT///



    jwt({token,user}){
      //console.log({token,user});
      if(user){
        token.data=user;
      }
      return token;
    },
    session({session,token,user}){
      //console.log({session,token,user});
      if(session.user){
        session.user = token.data as any;
      }
      return session;
    }
  },
  //estos callback se hace para obtener mas datos de los usuarios
  



  providers:[
    credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
    

        if(!parsedCredentials.success){//si no es correcto
            return null;
        }
        const {email,password}=parsedCredentials.data;
        console.log({email,password});
        //Buscar el correo
        const user =await prisma.user.findUnique({where:{email:email.toLowerCase()}});

        if(!user)return null;
          //Comparar las contraseñas
        if(!bcryptjs.compareSync(password,user.password)) return null

      
        //regresar el usuario
        const {password:_,...rest}=user;//quitamos el password de la lista o la informacion del usuario el password lo va a tomar como un _
        console.log(rest);
        return rest;
        },
      }),
  
  ]
};

export const { signIn,signOut,auth,handlers }=NextAuth(authConfig);