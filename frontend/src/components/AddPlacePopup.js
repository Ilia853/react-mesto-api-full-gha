import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [cardName, setCardName] = React.useState("");
    const [cardLink, setCardLink] = React.useState("");

    function handleAddCardNameSubmit(evt) {
        setCardName(evt.target.value);
    }
    function handleAddCardLinkSubmit(evt) {
        setCardLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
            name: cardName,
            link: cardLink,
        });
    }

    return (
        <PopupWithForm title="Новое место" name="mesto" isOpen={isOpen} onClose={onClose} buttonText="Создать" onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                id="popup__input-type-mesto"
                className="popup__input popup__input_type_mesto"
                placeholder="Название"
                onChange={handleAddCardNameSubmit}
                value={cardName || ""}
                required
                minLength="2"
                maxLength="30"
            />
            <span className="popup__input-error-message popup__input-type-mesto-error"></span>
            <input
                type="url"
                name="link"
                id="popup__input-type-link"
                className="popup__input popup__input_type_link"
                placeholder="Ссылка на картинку"
                onChange={handleAddCardLinkSubmit}
                value={cardLink || ""}
                required
            />
            <span className="popup__input-error-message popup__input-type-link-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;