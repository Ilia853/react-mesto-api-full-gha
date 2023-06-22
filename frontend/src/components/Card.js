import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";


function Card ({card, onCardClick, onCardDelete, onCardLike }) {

    const currentUser = React.useContext(CurrentUserContext);
    
    const handleCardClick = () => {
        onCardClick(card);
    }

    const handleDeleteClick =() => {
        onCardDelete(card._id);
    }

    const handleLikeClick = () => {
        console.log(card);
        onCardLike(card);
    }

    const isOwn = card.owner === currentUser._id;

    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = ( 
        `element__like-button ${isLiked && 'element__like-button_active'}` 
      );

    return (
        <div className="element" >
            <img className="element__image" alt={card.name} src={card.link} onClick={handleCardClick} />
            {isOwn && <button className="element__del-button" type="button" onClick={handleDeleteClick} />}
            <div className="element__box">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-box">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <span className="element__like-score">{card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Card