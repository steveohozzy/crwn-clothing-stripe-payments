import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/categoriesSelector";
import ProductCard from '../../components/productCard/ProductCard';
import { Spinner } from '../../components/spinner/spinner';
import { CategoryContainer, CategoryTitle } from './categoryStyles';

const Category = () => {
    const { category }  = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])
  return (
    <>
        <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
        {
            isLoading ? <Spinner /> : 

            <CategoryContainer>
                {
                products &&  products.map((product) => {
                        return (
                            <ProductCard product={product} key={product.id} />
                        )
                    })
                }
            </CategoryContainer>
        }
    </>
  )
}

export default Category
