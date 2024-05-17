import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;//es el numero del carrito de compras
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  addProductTocart: (product: CartProduct) => void;//agregar al carrito
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCard:()=>void;
}

export const useCartStore = create<State>()(
  persist(//persist es para agregar directamente al localstorage automaticamente y el identificardor es "shopping-cart"
    (set, get) => ({
      //set para guardar cambios
      //get para leer o obtener datos
      cart: [],

      // Methods
      getTotalItems: () => {

        const { cart } = get();
        console.log({cart});
        return cart.reduce((total, item) => total + item.quantity, 0);//valor inicial es 0 es decir el total y item es el varido
      },


      //!EL RESUMEN DE LA ORDEN QUE REGRESA EL TOTAL DE LA COMPRA
      getSummaryInformation: () => {
        const { cart } = get();
       

        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },
      //!EL RESUMEN DE LA ORDEN QUE REGRESA EL TOTAL DE LA COMPRA


      //!AÑADIR UN PRODUCTO AL CARRITO DE COMPRAS

      addProductTocart: (product: CartProduct) => {
   
        const { cart } = get();//el get obtiene el store actual en este caso cart

        console.log('kjasdhkjas');
        console.log({cart});
        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(//el some encuantra el producto y ya no busca mas
          (item) => item.id === product.id && item.size === product.size
        );

        //si el producto no existe se agreda al cart
        if (!productInCart) {
          set({ cart: [...cart, product] });//el set es para agregar o modificar el store en este caso el cart
          return;
        }

        // 2. Se que el producto existe por talla... tengo que incrementar
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });
        set({ cart: updatedCartProducts });
      },
      //!AÑADIR UN PRODUCTO AL CARRITO DE COMPRAS


      //!ACTUALIZAR LA CANTIDAD DE PRODUCTOS EN EL STORE
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      //!ACTUALIZAR LA CANTIDAD DE PRODUCTOS EN EL STORE


      //!ELIMINAR EL PRODUCTO DEL STORE
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: updatedCartProducts });
      },
      //!ELIMINAR EL PRODUCTO DEL STORE
      clearCard:()=>{
        set({cart:[]})
      }
    }),

    {
      name: "shopping-cart",
    }
  )
);