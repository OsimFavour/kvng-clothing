import { Fragment, useContext } from 'react'
import { CategoriesContext } from '../../contexts/categories.context'

import CategoryPreview from '../../components/category-preview/category-preview.component'


const CategoriesPreview = () => {

    const { isLoading, isError, categoriesMap } = useContext(CategoriesContext)


    console.log('Categories Map>>>>', categoriesMap);

    if (!categoriesMap || Object.keys(categoriesMap).length === 0) {
        return <Fragment>No internet connection. Please turn on your data..</Fragment> 
    }
    
    return (

        <Fragment>
            {isLoading ? (
                <Fragment>Loading...</Fragment>
            ) : isError ? (
                <Fragment>Oops! Something went wrong</Fragment>
            ) : (
                categoriesMap && <Fragment>


                    {Object.keys(categoriesMap).map((title) => {
                        const products = categoriesMap[title]

                        return (
                            <CategoryPreview key={title} title={title} products={products}/>   
                        )
                    })}
                </Fragment>
            )}
            
        </Fragment>
    )
}

export default CategoriesPreview