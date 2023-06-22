import React from "react";

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup image-popup ${card.link ? "image-popup_opened" : ""}`}>
            <div className="image-popup__container">
                <button type="button" className="popup__close-button popup__close-button_type_image" onClick={onClose}></button>
                <img className="image-popup__pic" alt={card.name} src={card.link}/>
                <h2 className="image-popup__title">{card.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;