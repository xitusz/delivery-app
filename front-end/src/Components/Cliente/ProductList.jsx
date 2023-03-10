import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList() {
  const [productData, setProductData] = useState();

  async function fetchData() {
    const fetchProducts = await fetch('http://localhost:3001/product').then(
      (response) => response.json(),
    );
    setProductData(fetchProducts);
  }

  useEffect(() => {
    if (!productData) {
      fetchData();
    }
  }, [productData]);

  return (
    <main className="productList">
      {productData
        && productData.map(({ id, name, price, urlImage }, index) => {
          const MAX_RECOMMENDATIONS = 11;
          if (index > MAX_RECOMMENDATIONS) return null;
          return (
            <div key={ `${id}-${name}` }>
              <ProductCard
                productId={ id }
                productName={ name }
                productPrice={ price }
                productUrlImage={ urlImage }
              />
            </div>
          );
        })}
    </main>
  );
}

export default ProductList;
