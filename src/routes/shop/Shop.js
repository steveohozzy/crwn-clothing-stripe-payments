import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchCategoriesAsync } from '../../store/categories/categoriesAction';
import CategoriesPreview from "../categoriesPreview/CategoriesPreview";
import Category from "../category/Category";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <Routes>
        <Route index element={<CategoriesPreview/>} />
        <Route path=":category" element={<Category />} />
    </Routes>
  )
}

export default Shop
