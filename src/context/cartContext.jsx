import { createContext, useEffect, useState } from "react";
import axios from "axios";

/* Creamos el context, se le puede pasar un valor inicial */
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  /* Creamos un estado para el carrito */
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);


  const getProducts = async () => {
    await axios
      .get("http://localhost:5010/producto",{
        headers:{
            'Accept-version':'1.0.0'
        }
      })
      .then((response) => {
      console.log(response.data.data);
      setProducts(response.data.data)
      }); 
      
  };

  const getProductsCart = async () => {
    return await axios
        .get("http://localhost:5010/producto",{
            headers:{
                'Accept-version':'1.0.0'
            }
        })
      .then((response) => {
        console.log(response.data.result);
        setCartItems(response.data.result)
      }); 
      
      
  };


  useEffect(() => {
    getProducts();
    getProductsCart();
  }, []);

  const addItemToCart = async (product) => {
    const {nombre, imagen, precio } = product;

    await axios.post("http://localhost:5010/producto/post", {nombre, imagen, precio });

  getProducts();
  getProductsCart();
};



  return (
    /* Envolvemos el children con el provider y le pasamos un objeto con las propiedades que necesitamos por value */
    <CartContext.Provider
      value={{ cartItems, products, addItemToCart}}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;