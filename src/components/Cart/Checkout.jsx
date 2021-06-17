import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;
const Checkout = ({ onCancel, onConfirm }) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (e) => {
        e.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid =
            !isEmpty(enteredPostalCode) && isFiveChars(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalCodeIsValid,
            city: enteredCityIsValid,
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredPostalCodeIsValid &&
            enteredCityIsValid;
        if (!formIsValid) {
            return;
        }
        onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode,
        });
    };

    const nameControlClasses = `${classes.control} ${
        formInputsValidity.name ? "" : classes.invalid
    }`;
    const streetControlClasses = `${classes.control} ${
        formInputsValidity.street ? "" : classes.invalid
    }`;
    const postalCodeControlClasses = `${classes.control} ${
        formInputsValidity.postalCode ? "" : classes.invalid
    }`;
    const cityControlClasses = `${classes.control} ${
        formInputsValidity.city ? "" : classes.invalid
    }`;

    return (
        <form onSubmit={confirmHandler} className={classes.form}>
            <div className={nameControlClasses}>
                <label htmlFor="name">Your Name</label>
                <input ref={nameInputRef} type="text" id="name" />
                {!formInputsValidity.name && (
                    <p>Please a enter a valid name!</p>
                )}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor="street">Street</label>
                <input ref={streetInputRef} type="text" id="street" />
                {!formInputsValidity.street && (
                    <p>Please a enter a valid street!</p>
                )}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input ref={postalCodeInputRef} type="text" id="postal" />
                {!formInputsValidity.postalCode && (
                    <p>
                        Please a enter a valid postal code (5 characters long)!
                    </p>
                )}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor="city">City</label>
                <input ref={cityInputRef} type="text" id="city" />
                {!formInputsValidity.city && <p>Please a enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};
export default Checkout;
