import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { createStore, applyMiddleware } from 'redux'
import allCategoriesReducer from './allCategoriesSlicer'
import addProductReducer from './addProductsSlicer'





const store = configureStore({
   reducer: {
     categoriesReducerData:allCategoriesReducer,
     addItemReducer:addProductReducer,
   }
})
export default store