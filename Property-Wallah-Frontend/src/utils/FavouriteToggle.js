export const handleFavoriteToggle = (property, isFavorite, setIsFavorite, enqueueSnackbar) => {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (isFavorite) {
    wishlist = wishlist.filter((item) => item._id !== property._id);
    enqueueSnackbar("Property removed from wishlist", { variant: "info" });
  } else {
    wishlist.push(property);
    enqueueSnackbar("Property added to wishlist", { variant: "success" });
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  setIsFavorite(!isFavorite);
};
