import React, { useContext, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";
function HeaderCartButton({ onClick }) {
    const [btnIsHightlighted, setBtnIsHightlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const numberOfCartItems = cartCtx.items.reduce((cartNumber, item) => {
        return cartNumber + item.amount;
    }, 0);

    const { items } = cartCtx;
    const btnClasses = `${classes.button} ${
        btnIsHightlighted ? classes.bump : ""
    }`;
    useEffect(() => {
        if (items.length === 0) {
            return;
        }

        setBtnIsHightlighted(true);
        setTimeout(() => {
            setBtnIsHightlighted(false);
        }, 300);
    }, [items]);
    return (
        <button className={btnClasses} onClick={onClick}>
            <span>
                <AiOutlineShoppingCart className={classes.icon} />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
}

export default HeaderCartButton;
