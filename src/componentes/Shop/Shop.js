import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData'
import Cart from '../cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import '../../utilities/databaseManager';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
const Shop = () => {


    // console.log(fakeData);
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const previousCart = productKey.map( exsitingKey => {
                const product = fakeData.find(pd => pd.key === exsitingKey);
                product.quantity = savedCart[exsitingKey];
                console.log(exsitingKey, savedCart[exsitingKey]);
                return product;
        });
        // console.log(previousCart);
        setCart(previousCart);
    },[]);


    const handleAddProduct = (product) => {
        console.log("Product Added",product.key);
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        console.log(sameProduct);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
            console.log(newCart);
        }else {
            product.quantity = 1;
            newCart = [...cart, product];
            console.log(newCart);
        }
        
        // const sameProduct = newCart.filter(pd => pd.key === product.key);
                
        addToDatabaseCart(product.key , count);
        setCart(newCart);
    }
    return (
        <div className="twin-container">
            <div className="product-container">
            {
                products.map( pd => <Product
                    key = {pd.key}
                    showAddtoCart={true}
                     handleAddProduct = {handleAddProduct}
                     product = {pd}
                     ></Product>)
            }
            </div>
            <div className="card-container">
                {/* <h1>This Is Cart</h1>
                <h5>Order Summery : {cart.length}</h5> */}

                <Cart cart={cart}>
                <Link to="/review">
                    <button className="main-button">Review Order</button>
                </Link>
                </Cart>
            </div>
           
        </div>
    );
};

export default Shop;