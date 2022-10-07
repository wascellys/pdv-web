import { createContext, useState } from "react";

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [listItems, setListItems] = useState([]);

  function formatCoin(value) {
    var formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return formatter.format(value);
  }

  function clearListItem() {
    setListItems([]);
  }

  function removeItemCart(item) {
    const index = listItems.map((object) => object.id).indexOf(item?.id);
    console.log(index);
    listItems.splice(index, 1);

    setListItems((item) => [...item]);
  }

  return (
    <CartContext.Provider
      value={{
        listItems,
        clearListItem,
        setListItems,
        formatCoin,
        removeItemCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
