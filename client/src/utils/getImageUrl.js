const BACKEND_URL =
  process.env.REACT_APP_API_URL ||
  "https://mern-ecommerce-0wd5.onrender.com";

export const getImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http")) {
    return image;
  }

  return `${BACKEND_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};