import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector'

import ProductCard from '../../components/product-card/product-card.component'

import { CategoryContainer, Title } from './category.styles'
import Spinner from '../../components/spinner/spinner.component'


const Category = () => {
    const { category } = useParams()

    const categoriesMap = useSelector(selectCategoriesMap)
    const [products, setProducts] = useState([])

    const isLoading = useSelector(selectCategoriesIsLoading)

    useEffect(() => {
        if (categoriesMap && categoriesMap[category]) {
            setProducts(categoriesMap[category])
        }
    }, [category, categoriesMap])


    // if (!categoriesMap) {
    //     return <Fragment>There is no internet connection.</Fragment>
    // }

    // if (!categoriesMap[category] || !categoriesMap[category].length) {
    //     return <Fragment>Please turn on internet connection.</Fragment>
    // }
    
    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            
            {isLoading ? (
                <Spinner />
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