import React from "react";
import { Link, Route, Routes } from "react-router-dom";

function Header({userEmail}) {

    function signOut(){
        localStorage.removeItem('token');
      }

    return (
        <header className="header">
            <div className="header__logo"></div>
            <Routes>
                <Route
                    path="/sign-up"
                    element={
                        <Link className="header__links" to="/sign-in">
                            Вход
                        </Link>
                    }
                ></Route>
                <Route
                    path="/sign-in"
                    element={
                        <Link className="header__links" to="/sign-up">
                            Регистрация
                        </Link>
                    }
                ></Route>
                <Route
                    path="/"
                    element={
                        <div className="header__links-container">
                            <p className="header__email">{userEmail}</p>
                            <Link className="header__logout" to="/sign-up" onClick={signOut} >
                                Выход
                            </Link>
                        </div>
                    }
                ></Route>
            </Routes>
        </header>
    );
}

export default Header;
