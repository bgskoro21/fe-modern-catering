export const initialState = {
  itemCount: 0,
  cartItems: [],
};

const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.cartItems.findIndex((item) => parseInt(item.paket_prasmanan_id) === parseInt(action.payload.paket_prasmanan_id));
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.cartItems];
        const existingItem = updatedItems[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          id: action.payload.id,
          paket_prasmanan_id: action.payload.paket_prasmanan_id,
          paket_prasmanan: action.payload.paket_prasmanan,
          user_id: action.payload.user_id,
          amount: action.payload.amount,
          menu: action.payload.menu,
          total_harga: action.payload.total_harga,
        };
        // console.log(updatedItem);bagas
        updatedItems[existingItemIndex] = updatedItem;
        return { ...state, cartItems: updatedItems };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
          itemCount: state.itemCount + 1,
        };
      }
    case "REMOVE_ITEM":
      const filteredItems = state.cartItems.filter((item) => item.id !== action.payload);
      return { ...state, itemCount: state.itemCount - 1, cartItems: filteredItems };
    case "GET_ITEM":
      return { ...state, itemCount: action.payload.length, cartItems: action.payload };
    case "EDIT_ITEM":
      const index = state.cartItems.findIndex((cart) => cart.id === action.payload.id);
      const editedItem = state.cartItems[index];
      let total_harga = action.payload.amount * state.cartItems[index].paket_prasmanan.harga;
      return {
        ...state,
        cartItems: [
          ...state.cartItems.slice(0, index),
          {
            ...editedItem,
            amount: action.payload.amount,
            total_harga: total_harga,
          },
          ...state.cartItems.slice(index + 1),
        ],
      };
    case "RESET_CART":
      return { itemCount: 0, cartItems: [] };
    case "RESET_SELECTED_CART":
      const packagesId = action.payload.packagesId;
      const updatedItems = state.cartItems.filter((item) => !packagesId.includes(item.id));
      return { ...state, itemCount: state.itemCount - packagesId.length, cartItems: updatedItems };
    default:
      return state;
  }
};

export default CartReducer;
