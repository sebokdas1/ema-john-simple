import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'

const Orders = () => {
    const [products] = useProducts();
    const navigate = useNavigate()
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
                    <button onClick={() => navigate('/inventory')}>Proceed Checkout</button>

                </Cart>
            </div>

        </div>
    );
};

export default Orders;