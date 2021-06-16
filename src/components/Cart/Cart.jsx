import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "./../../store/cart-context";
import CartItem from "./CartItem";
function Cart({ onHideCart }) {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${
        cartCtx.totalAmount < 0 ? "0.00" : cartCtx.totalAmount.toFixed(2)
    }`;
    const hasItem = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };
    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    amount={item.amount}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );
    return (
        <Modal onClick={onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button-alt"]} onClick={onHideCart}>
                    Close
                </button>
                {hasItem && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;
