import { groq } from "next-sanity";

export const allproducts = groq`*[_type == "product"]`;
export const four = groq`*[_type == "product"][0..3]`;

// productBySlugQuery to fetch product by slug
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    pricePerDay,
    originalPrice,
    "imageUrl": image.asset->url,
    slug
  }
`;
