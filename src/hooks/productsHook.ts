// @ts-nocheck
import { useContext } from 'react';
import { ProductsContext } from '../context/products';
import { IGetProductsVariables } from '../services/admin-panel-service/types';

export const useProducts = () => {
  const productsData = useContext(ProductsContext);

  const getProducts = ({ filter }: IGetProductsVariables) => {
    const mappedFilter: IGetProductsVariables = {};
    let isLimited = false;

    Object.keys(filter).forEach(function (key) {
      if (key === 'limit' || key === 'skip') {
        return (isLimited = true);
      }
      mappedFilter[key] = filter[key];
    });

    const mappedFilterKeys = Object.keys(mappedFilter);

    if (mappedFilterKeys.length) {
      const filteredProducts = productsData.products.filter(product => {
        let acceptedFilters = 0;
        mappedFilterKeys.forEach(filterItem => {
          if (product[filterItem] === filter[filterItem]) {
            acceptedFilters += 1;
          }
        });
        return acceptedFilters === mappedFilterKeys.length;
      });

      return {
        ...productsData,
        products: isLimited
          ? filteredProducts.slice(filter.skip, filter.limit + filter.skip)
          : filteredProducts,
      };
    }

    return {
      ...productsData,
      products: isLimited
        ? productsData.products.slice(filter.skip, filter.limit + filter.skip)
        : productsData.products,
    };
  };

  const getProductById = ({ id }: IGetProductByIdVariables) => {
    return productsData.products.filter(product => product._id === id)?.[0];
  };

  return { getProducts, getProductById };
};
