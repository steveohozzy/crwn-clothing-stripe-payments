import ProductCard from '../productCard/ProductCard';

import { CategoryPreviewContainer, Preview, CategoryLink } from './categoryPreviewStyles';

const CategoryPreview = ({title, products}) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryLink to={title} className='title'>{title.toUpperCase()}</CategoryLink>
      </h2>
      <Preview>
        {
            products.filter((_, idx) => idx < 4)
            .map((product) => 
                <ProductCard key={product.id} product={product} />
            )
        }
      </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview
