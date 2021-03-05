import React from 'react';

const Review = (props) => {
    // console.log(props);
    const {name , quantity, key, price} = props.product;
    const reviewItemStyle = {
        borderBottom : '1px solid red',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft:'200px'
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity : {quantity}</p>
            <p>Price : {price}</p>
            <button onClick={() => props.removedProduct(key)} className="main-button">Remove</button>
        </div>
    );
};

export default Review;