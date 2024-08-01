import ProductCard from "../product-card/product-card.component"

import { CartegoryPreviewContainer, Preview, Title } from "./category-preview.styles.jsx";

const CategoryPreview = ({ title, products }) => {
    return (
        <CartegoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {products.filter((_, idx) => idx < 4)
                .map((product) => <ProductCard key={product.id} product={product}/>)}
            </Preview>
        </CartegoryPreviewContainer>
    )
}

export default CategoryPreview