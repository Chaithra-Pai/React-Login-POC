import {
	CLEAR_PRODUCT_ERROR,
	FETCH_PRODUCTS,
	FETCH_PRODUCTS_FAILED,
	FILTER_PRODUCTS_BY_SIZE,
	ORDER_PRODUCTS_BY_PRICE,
} from './types';

import axios from 'axios'
export const fetchProducts = () => (dispatch) => {
	axios.get('http://localhost:3000/products', {
		method: 'GET',
		headers: {
			authorization: localStorage.getItem('accessToken'),
		}
	})
		.then((response) => {
			console.log(response, "successs")
			dispatch({ type: FETCH_PRODUCTS, payload: response.data });
		})
		.catch((error) => { console.log(error, "faileddd"); dispatch({ type: FETCH_PRODUCTS_FAILED, payload: error }) });
};

export const clearProductError = () => {
	return ((dispatch) => {
		dispatch({ type: CLEAR_PRODUCT_ERROR })
	})
}
export const filterProducts = (products, size) => (dispatch) => {
	dispatch({
		type: FILTER_PRODUCTS_BY_SIZE,
		payload: {
			size: size,
			items:
				size === ''
					? products
					: products.filter((x) => x.availableSizes.indexOf(size.toUpperCase()) >= 0),
		},
	});
};

export const sortProducts = (items, sort) => (dispatch) => {
	const products = items.slice();
	if (sort !== '') {
		products.sort((a, b) =>
			sort === 'lowestprice' ? (a.price > b.price ? 1 : -1) : a.price < b.price ? 1 : -1,
		);
	} else {
		products.sort((a, b) => (a.id > b.id ? 1 : -1));
	}
	dispatch({
		type: ORDER_PRODUCTS_BY_PRICE,
		payload: {
			sort: sort,
			items: products,
		},
	});
};
