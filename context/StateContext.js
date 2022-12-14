import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { findAndFilterProducts } from "../helpers/findFilterProducts";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product, quantity) => {
    const { foundProduct } = findAndFilterProducts(cartItems, product._id);

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (foundProduct) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === product._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          };
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, product]);
    }

    toast.success(`${qty} ${product.name} added to the cart`);
  };

  const onRemove = (product) => {
    const { foundProduct, newCartItems } = findAndFilterProducts(
      cartItems,
      product._id
    );

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );

    setTotalQuantities((prevTotalQuantities) => {
      return prevTotalQuantities - foundProduct.quantity;
    });

    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (product, action) => {
    const { foundProduct, newCartItems, indexOfFoundProduct } =
      findAndFilterProducts(cartItems, product._id);

    if (action === "inc") {
      newCartItems.splice(indexOfFoundProduct, 0, {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      });

      setCartItems(newCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (action === "dec") {
      if (foundProduct.quantity > 1) {
        newCartItems.splice(indexOfFoundProduct, 0, {
          ...foundProduct,
          quantity: foundProduct.quantity - 1,
        });

        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
