import React, { useState, createContext, useMemo } from "react";

export interface Product {
  id: string;
  name: string;
  image: string;
  details: string[];
  price: number;
  // duration of warranty
  yearsOfWarranty: number;
}

const products: Product[] = [
  {
    id: "product-01",
    name: "APPLE 2020 Macbook Pro M1 - (8 GB/256 GB SSD)",
    image:
      "https://user-images.githubusercontent.com/26283488/177882770-b87f933c-96e2-4a82-8ae5-7e5c0ac4787c.jpg",
    details: [
      "Apple M2 Processor",
      "8 GB Unified Memory",
      "Mac OS Operating System",
      "265 GB SSD",
      "33.78 cm (13.3 Inch) Display",
      "2 Year Limited Warranty",
    ],
    price: 140000,
    yearsOfWarranty: 2,
  },
  {
    id: "product-02",
    name: "CITIZEN BU2080-51H Analog Watch - For Men",
    image:
      "https://user-images.githubusercontent.com/26283488/182025625-8881a153-fa31-4f50-b593-92758caed4dd.png",
    details: [
      "Water Resistant - 100 m",
      "Display Type - Analog",
      "Style Code - BU2080-51H",
      "Occasion - Formal",
      "Watch Type - Wrist Watch",
      "4 Year Limited Warranty",
    ],
    price: 34110,
    yearsOfWarranty: 4,
  },
  {
    id: "product-03",
    name: "SAMSUNG Crystal 4K Pro 65 inch 4K LED TV",
    image:
      "https://user-images.githubusercontent.com/26283488/182025882-780f2e4c-5241-4fe1-bd94-b110c2d0a9cf.png",
    details: [
      "Resolution: Ultra HD (4K) 3840 x 2160",
      "Sound Output: 20 W",
      "Refresh Rate: 60 Hz",
      "Supported Apps: Netflix, Youtube",
      "LED Display Type - Backlit LED",
      "3 Year Limited Warranty",
    ],
    price: 81900,
    yearsOfWarranty: 3,
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
