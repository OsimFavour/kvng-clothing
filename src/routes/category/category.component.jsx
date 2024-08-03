import { Fragment, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { CategoriesContext } from '../../contexts/categories.context'

import ProductCard from '../../components/product-card/product-card.component'
import { CategoryContainer, Title } from './category.styles'



const Category = () => {
    const { category } = useParams()
    const { isLoading, categoriesMap } = useContext(CategoriesContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (categoriesMap && categoriesMap[category]) {
            setProducts(categoriesMap[category])
        }
    }, [category, categoriesMap])


    if (!categoriesMap) {
        return <Fragment>There is no internet connection.</Fragment>
    }

    if (!categoriesMap[category] || !categoriesMap[category].length) {
        return <Fragment>Please turn on internet connection.</Fragment>
    }
    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            {isLoading ? (
                <Fragment>Loading...</Fragment>
                ) : (
                <CategoryContainer>
                    {products && products.map((product) => 
                        <ProductCard key={product.id} product={product}/>
                    )}
                </CategoryContainer>
            )}
        </Fragment>
    )
}

export default Category