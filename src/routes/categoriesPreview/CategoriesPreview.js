import { useSelector } from "react-redux";

import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/categoriesSelector";
import CategoryPreview from "../../components/categoryPreview/CategoryPreview";
import { Spinner } from "../../components/spinner/spinner";

const CategoriesPreview = () => {

    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <> 
        {
            isLoading ? <Spinner /> :
            
            Object.keys(categoriesMap).map(title => {
                const products = categoriesMap[title]

                return (
                    <CategoryPreview key={title} title={title} products={products} />
                )
            })
        }
    </>
  )
}

export default CategoriesPreview
