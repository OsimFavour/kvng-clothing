import { Fragment } from 'react'
import { useSelector } from 'react-redux'

import { selectCategoriesMap } from '../../store/categories/category.selector'

import CategoryPreview from '../../components/category-preview/category-preview.component'


const CategoriesPreview = () => {

    const categoriesMap = useSelector(selectCategoriesMap)

    if (!categoriesMap || Object.keys(categoriesMap).length === 0) {
        return <Fragment>No internet connection. Please turn on your data..</Fragment> 
    }
    
    return (

        <Fragment>


            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title]

                return (
                    <CategoryPreview key={title} title={title} products={products}/>   
                )
            })}
               
            
        </Fragment>
    )
}

export default CategoriesPreview