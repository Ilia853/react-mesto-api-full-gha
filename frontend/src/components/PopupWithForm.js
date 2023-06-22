import React from "react";

function PopupWithForm({ title, name, children, isOpen, onClose, buttonText, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ` + (isOpen ? "image-popup_opened" : "")}>
            <div className="popup__container">
                <button type="button" className={`popup__close-button popup__close-button_type_${name}`} onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form className={`popup__form popup__form_type_${name}`} name={`form-name-${name}`} onSubmit={onSubmit} noValidate>
                    {children}
                    <button type="submit" className="popup__form-button">
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
