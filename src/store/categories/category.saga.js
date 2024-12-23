import { takeLatest, all, call, put } from "redux-saga/effects"
import { CATEGORIES_ACTION_TYPES } from "./category.types"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"
import { fetchCategoriesFailed, fetchCategoriesSuccess } from "./category.action"


export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, "categories")
        
        yield put(fetchCategoriesSuccess(categoriesArray))
        
    } catch(error) {
        yield put(fetchCategoriesFailed(error))
        console.log('Error Message', error);
        
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}