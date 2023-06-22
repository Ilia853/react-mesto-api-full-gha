import React from "react";

function InfoTooltip({ isOpen, onClose, registerInfo, registerStatus }) {
    return (
        <div className={`popup ` + (isOpen ? "image-popup_opened" : "")}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <div className={`popup__reg-status ` + (registerStatus ? "popup__reg-status_type_ok" : "popup__reg-status_type_err")}></div>
                <h2 className="popup__reg-title">{registerInfo}</h2>
            </div>
        </div>
    );
}

export default InfoTooltip;
