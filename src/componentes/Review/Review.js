import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../cart/Cart';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router';
const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();
    const handleProceedCheckOut = () => {
        // console.log('Placed Order');
        history.push('/shipment');
    }
    
    const removedProduct = (productKey) => {
        // console.log('removed product', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }


    useEffect(()=>{
        //Cart Data
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProduct = productKeys.map( key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProduct);
        // console.log(cartProduct);
        // console.log(productKeys);
    },[]);
    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImg} alt=""/>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem 
                    removedProduct={removedProduct} 
                    product={pd} key={pd.key}
                    ></ReviewItem>)
            }
            {thankyou}
            </div>
            <div className="card-name">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckOut} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;