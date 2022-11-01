export const findAndFilterProducts = (arr, id) => {
  const foundProduct = arr.find((item) => item._id === id);
  const newCartItems = arr.filter((item) => item._id !== id);
  const indexOfFoundProduct = arr.findIndex((product) => product._id === id);

  return {
    foundProduct,
    newCartItems,
    indexOfFoundProduct,
  };
};
