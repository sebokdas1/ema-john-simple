import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'

const Orders = () => {
    const [products] = useProducts();
    const [cart, setcart] = useCart(products);
    const handleRemoveProduct = product => {
        const rest = cart.filter(pd => pd.id !== product.id);
        setcart(rest)
        removeFromDb(product.id)
    }
    return (
        <div className='shop-container'>
            <div className='review-item-container'>
                {
                    cart.map(product => <ReviewItem
                        key={product.id}
                        handleRemoveProduct={handleRemoveProduct}
                        product={product}
                    ></ReviewItem>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <Link to="/shop">
                        <button>Proceed Checkout</button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Orders;