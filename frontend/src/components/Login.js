import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

function Login({ handleSubmitLogin, handleEmailChange, handlePasswordChange }) {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // function handleEmailChange(evt) {
    //     setEmail(evt.target.value);
    // }

    // function handlePasswordChange(evt) {
    //     setPassword(evt.target.value);
    // }

    // const navigate = useNavigate();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!email || !password) {
    //         return;
    //     }
    //     auth.authorize(email, password)
    //         .then((data) => {
    //             if (data.token) {
    //                 setEmail("");
    //                 setPassword("");
    //                 handleLogin();
    //                 navigate("/", { replace: true });
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("Login", err);
    //         });
    // };

    return (
        <div className="register">
            <h2 className="register__title">Вход</h2>
            <form className="register__form" onSubmit={handleSubmitLogin}>
                <input placeholder="Email" className="register__input register__input_type_email" onChange={handleEmailChange} />
                <input
                    placeholder="Пароль"
                    className="register__input register__input_type_password"
                    type="password"
                    onChange={handlePasswordChange}
                />
                <button className="register__form-button" onSubmit={handleSubmitLogin}>
                    Войти
                </button>
            </form>
        </div>
    );
}

export default Login;
