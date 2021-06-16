import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "./../../../store/cart-context";
function MealItem({ id, name, description, price }) {
    const cartCtx = useContext(CartContext);
    const formatPrice = `$${price.toFixed(2)}`;

    const addToCartHandler = (amount) => {
        cartCtx.addItem({ id, name, description, price, amount });
    };
    return (
        <li className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{formatPrice}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} />
            </div>
        </li>
    );
}

export default MealItem;
