import React, { useState, createContext, useMemo } from "react";

export interface Product {
  id: string;
  name: string;
  image: string;
  details: string[];
  price: number;
  // duration of warranty
}

const products: Product[] = [
  {
    id: "product-01",
    name: "APPLE 2020 Macbook Pro M1 - (8 GB/256 GB SSD)",
    image:
      "https://user-images.githubusercontent.com/26283488/177882770-b87f933c-96e2-4a82-8ae5-7e5c0ac4787c.jpg",
    details: [
      "Apple M2 Processor",
      "8 GB Unified Memory RAM Mac OS Operating",
      "Mac OS Operating System",
      "265 GB SSD",
      "33.78 cm (13.3 Inch) Display",
      "1 Year Limited Warranty",
    ],
    price: 140000,
  },
  {
    id: "product-02",
    name: "APPLE 2020 Macbook Pro M1 - (8 GB/256 GB SSD)",
    image:
      "https://user-images.githubusercontent.com/26283488/177882770-b87f933c-96e2-4a82-8ae5-7e5c0ac4787c.jpg",
    details: [
      "Apple M2 Processor",
      "8 GB Unified Memory RAM Mac OS Operating",
      "Mac OS Operating System",
      "265 GB SSD",
      "33.78 cm (13.3 Inch) Display",
      "1 Year Limited Warranty",
    ],
    price: 140000,
  },
];

interface ProductContextType {
  product: null | Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  products: Product[];
}

export const ProductContext = createContext<ProductContextType>({
  product: products[0],
  setProduct: () => {},
  products,
});

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [product, setProduct] = useState<Product>(products[0]);

  const value = useMemo(
    () => ({
      product,
      products,
      setProduct,
    }),
    [product]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
