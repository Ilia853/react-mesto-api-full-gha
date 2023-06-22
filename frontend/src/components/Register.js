import React from "react";
import { Link } from "react-router-dom";

function Register({ handleEmailChange, handlePasswordChange, handleSubmitRegister }) {
    return (
        <div>
            <div className="register">
                <h2 className="register__title">Регистрация</h2>
                <form className="register__form" onSubmit={handleSubmitRegister}>
                    <input className="register__input register__input_type_email" placeholder="Email" onChange={handleEmailChange} />
                    <input
                        className="register__input register__input_type_password"
                        type="password"
                        placeholder="Пароль"
                        onChange={handlePasswordChange}
                    />
                    <button className="register__form-button" onSubmit={handleSubmitRegister}>
                        Зарегистрироваться
                    </button>
                </form>
                <div className="register__sign-in">
                    <p className="register__paragraph">Уже зарегистрированы?</p>
                    <Link to="/sign-in" className="register__login-link">
                        Войти
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
