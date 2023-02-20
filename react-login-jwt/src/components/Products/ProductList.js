import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import util from '../../util';
import { addToCart } from '../../redux/actions/cartActions';
import { clearProductError, fetchProducts } from '../../redux/actions/productActions';
import { fetchJwtToken } from '../../redux/actions/fetchJwtActions';

const ProductList = () => {
	const dispatch = useDispatch();

	const cartItems = useSelector((state) => state.cart.items);
	const { items, productFetchError } = useSelector((state) => state.products);

	useEffect(() => {
      dispatch(fetchProducts());
	}, []);


	const productItems = items?.map((product) => (
		<div className="col-md-4" key={product.id}>
			<div className="thumbnail text-center">
				<a href={`#${product.id}`} onClick={(e) => dispatch(addToCart(cartItems, product))}>
					<img src={`products/${product.sku}_2.jpg`} alt={product.title} />
					<p>{product.title}</p>
				</a>
				<p>
					<b>{util.formatCurrency(product.price)}</b>
				</p>
				<button
					className="btn btn-primary"
					onClick={(e) => dispatch(addToCart(cartItems, product))}
				>
					Add to cart
				</button>
			</div>
		</div>
	));

	return <div className="row">{productItems}</div>;
};

export default ProductList;
