import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
      
        onUpdateUser({
          name,
          about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, isOpen]);

    return (
        <PopupWithForm
                        title="Редактировать профиль"
                        name="edit"
                        isOpen={isOpen}
                        onClose={onClose}
                        buttonText="Сохранить"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            name="name"
                            id="popup__input-type-name"
                            className="popup__input popup__input_type_name"
                            placeholder="Имя"
                            required
                            minLength="2"
                            maxLength="40"
                            onChange={handleNameChange}
                            value={name || ""}
                        />
                        <span className="popup__input-error-message popup__input-type-name-error"></span>
                        <input
                            type="text"
                            name="about"
                            id="popup__input-type-job"
                            className="popup__input popup__input_type_job"
                            placeholder="Занятие"
                            required
                            minLength="2"
                            maxLength="200"
                            onChange={handleDescriptionChange}
                            value={description || ""}
                        />
                        <span className="popup__input-error-message popup__input-type-job-error"></span>
                    </PopupWithForm>
    )
}

export default EditProfilePopup;