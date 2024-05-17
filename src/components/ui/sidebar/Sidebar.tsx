'use client'
import { logout } from "@/actions"
import { useUIStore } from "@/store"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"


export const Sidebar = () => {
    const isSideMenuOpen= useUIStore(state => state.isSideMenuOpen);//Utilizar el store de MenuOpen
    const closeMenu= useUIStore(state => state.closeSideMenu);


    const {data:session} =useSession();//es un hoosk para las sesiones al lado del cliente //Para utilizar este hook necita estar en un Provider la cual se creo en la carpeta provider ,y se emvolvio en el layout principal para obtener en toda la app la session del usuario

    const isAuthenticated =!!session?.user //si user existe con !!convierte en booleano

    //console.log({session});

    const isAdmin =(session?.user.role === 'admin');//retorna un booleano


  return (
    <div>
        {/* Background black Colaca el fondo de color GRIS*/ }

        {
            isSideMenuOpen && (
                <div 
                    
                    className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
                />

            )
        }
        

    
        {/* Blur LE DA UN EFECTO DE OPACIDAD (backdrop-blur-sm SE CAMBA LG XS)*/ }
        {
            isSideMenuOpen&&
            (
                <div
                    onClick={closeMenu}
                    className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                />
    )
        }
        
          
        {/* Sidemenu */ }

        <nav 
            className=
            {
                clsx(//para añadir calse 
                    "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                    {
                        "translate-x-full":!isSideMenuOpen  /* SI ES FALSE AÑADIR */
                    }
                )
            }
            
            
    
        >
            <IoCloseOutline /* ICONO PARA CERRAR */
                onClick={closeMenu}
                size={ 50 }
                className="absolute top-5 right-5 cursor-pointer"
      
            />
            {/* Input eS EL BUSCADOR */ }
            <div className="relative mt-14">
                <IoSearchOutline size={ 20 } className="absolute top-2 left-2" />
                <input
                    type="text"
                    placeholder="Buscar"
                    className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                />
            </div>


            {/* Menú */ }

            {
                isAuthenticated &&
                (
                    <>
                        <Link
                            onClick={closeMenu}
                            href="/profile"
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoPersonOutline size={ 30 } />
                            <span className="ml-3 text-xl">Perfil</span>
                        </Link>

                        <Link
                        href="/orders"
                        onClick={closeMenu}
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoTicketOutline size={ 30 } />
                            <span className="ml-3 text-xl">Ordenes</span>
                        </Link>
                    </>
                )
            }
            

            {
                isAuthenticated &&(
                    <button
                        className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        onClick={() => logout()}
                    >
                        <IoLogOutOutline size={30} />
                        <span className="ml-3 text-xl">Salir</span>
                    </button>
                )
            }
            {
                !isAuthenticated &&(
                    <Link
                        onClick={closeMenu}
                        href="/auth/login"
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                    >
                        <IoLogInOutline size={ 30 } />
                        <span className="ml-3 text-xl">Ingresar</span>
                    </Link>
                )
            }

            
            {
                isAdmin &&
                (
                    <>
                        <div className="w-full h-px bg-gray-200 my-10" />


                        <Link
                        href="/admin/products"
                        onClick={closeMenu}
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoShirtOutline size={ 30 } />
                            <span className="ml-3 text-xl">Productos</span>
                        </Link>

                        <Link
                        href="/admin/orders"
                        onClick={closeMenu}
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoTicketOutline size={ 30 } />
                            <span className="ml-3 text-xl">Ordenes</span>
                        </Link>

                        <Link
                        href="/admin/users"
                        onClick={closeMenu}
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoPeopleOutline size={ 30 } />
                            <span className="ml-3 text-xl">Usuarios</span>
                        </Link>
                    </>
                )
            }
            

            {/* Line Separator */ }
            

        </nav>

    </div>
  )
}

