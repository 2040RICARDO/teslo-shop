import { create } from 'zustand'

interface State{
  isSideMenuOpen:boolean;
  openSideMenu:()=>void;//es de tipo funcion que no retorna nada
  closeSideMenu:()=>void;//es de tipo funcion que no retorna nada

}

export const useUIStore = create<State>()((set) => ({
  isSideMenuOpen:false,

  openSideMenu:()=>set({isSideMenuOpen:true}),

  closeSideMenu:()=>set({isSideMenuOpen:false}),

}))