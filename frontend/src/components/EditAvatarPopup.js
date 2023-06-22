import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const [avatar, setAvatar] = React.useState("");
    const avatarRef = React.useRef();

    function handleAvatarChange(evt) {
        setAvatar(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="avatar"
            isOpen={isOpen}
            onClose={onClose}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                name="avatar"
                id="popup__input-type-avatar"
                className="popup__input popup__input_type_avatar"
                placeholder="Ссылка на новый аватар"
                ref={avatarRef}
                onChange={handleAvatarChange}
                value={avatar || ""}
                required
            />
            <span className="popup__input-error-message popup__input-type-avatar-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;