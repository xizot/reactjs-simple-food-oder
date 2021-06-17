import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "./../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
function Cart({ onHideCart }) {
    const [isCheckout, setisCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
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

    const orderHandler = () => {
        setisCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch(process.env.REACT_APP_BE_URL + "order.json", {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items,
            }),
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
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
    const modalActions = (
        <div className={classes.actions}>
            <button className={classes["button-alt"]} onClick={onHideCart}>
                Close
            </button>
            {hasItem && (
                <button className={classes.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
                <Checkout
                    onCancel={onHideCart}
                    onConfirm={submitOrderHandler}
                />
            )}
            {!isCheckout && modalActions}
        </>
    );
    const isSubmittingModalContent = <p>Sending order data...</p>;
    const didSubmitModalContent = <p>Successfully sent the order!</p>;
    return (
        <Modal onClick={onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {didSubmit && didSubmitModalContent}
        </Modal>
    );
}

export default Cart;
