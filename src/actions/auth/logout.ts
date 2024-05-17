'use server';

import { signOut } from '@/auth.config';


export const logout = async() => {

  await signOut();//solo ejecuta la funcion del auth.config


}