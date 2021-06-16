import React from "react";
import classes from "./Header.module.css";
import mealsImage from "../../assets/images/background-header.jpg";
import HeaderCartButton from "./HeaderCartButton";
function Header({ onShowCart }) {
    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={onShowCart} />
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImage} alt="A burger" />
            </div>
        </>
    );
}

export default Header;
