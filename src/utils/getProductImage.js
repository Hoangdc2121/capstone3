export default function getProductImage(image) {
  if (!image) return undefined;

  return image.startsWith("http")
    ? image
    : `https://apistore.cybersoft.edu.vn/images/${image}`;
}
