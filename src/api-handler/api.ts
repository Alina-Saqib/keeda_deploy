import axios from 'axios';
import api from './token-handler';

// Authentication Apis
export const signUp = (formData: any) =>
  axios.post('http://localhost:4000/user/register', formData);
export const logIn = (formData: any) =>
  axios.post('http://localhost:4000/user/signin', formData);

// Product Apis
// Post Apis
export const addBusiness = async (data: any) => {
  try {
    const response = await api.post('product/add-business', data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addOutlet = async (data: any) => {
  try {
    const response = await api.post('product/add-outlet', data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addMenu = async (data: any, outletId: any) => {
  try {
    const response = await api.post(`product/add-menu/${outletId}`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addCategory = async (data: any) => {
  try {
    const response = await api.post('product/add-category', data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addProduct = async (data: any) => {
  try {
    const response = await api.post('product/add-product', data);
    return response;
  } catch (error) {
    console.error(error);
  }
};
// Get Apis
export const getOutletOptions = async () => {
  try {
    const response = await api.get('product/get-outlets');
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getCategoryOptions = async (outletName: string) => {
  try {
    const response = await api.get(`product/get-categories/${outletName}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getAllFulfilments = async () => {
  try {
    const response = await api.get('product/get-all-fulfilments');
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getAllSubscriptions = async () => {
  try {
    const response = await api.get('product/get-all-subscriptions');
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getAllMenus = async () => {
  try {
    const response = await api.get('product/get-all-menus');
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getAllCategory = async () => {
  try {
    const response = await api.get('product/get-all-categories');
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getAllProducts = async () => {
  try {
    const response = await api.get('product/get-all-products');
    return response;
  } catch (error) {
    console.error(error);
  }
};
/// Get By Id
export const getCategoryById = async (id: any) => {
  try {
    const response = await api.get(`product/get-category-by-id/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getMenuById = async (id: any) => {
  try {
    const response = await api.get(`product/get-menu/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getSpecificMenuCategory = async (id: any) => {
  try {
    const response = await api.get(`product/get-category-by-menu/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getSpecificCategoryProducts = async (id?: any) => {
  try {
    const response = await api.get(`product/get-products-by-category/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
//// Update apis
export const updateMenu = async (id: any, Data: any) => {
  try {
    const response = await api.patch(`product/update-menu/${id}`, Data);
    return response;
  } catch (error) {
    console.error(error);
  }
};
