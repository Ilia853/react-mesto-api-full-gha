import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerInfo, setRegisterInfo] = useState("");
    const [registerStatus, setRegisterStatus] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            api.getProfile()
                .then((userData) => {
                    console.log('USERDATA', userData);
                    setCurrentUser(userData);
                })
                .catch((err) => {
                    console.log("userDataError", err);
                });
        }
    }, [loggedIn]);

    useEffect(() => {
        if (loggedIn) {
            api.getInitialCards()
                .then((cardsData) => {
                    console.log(cardsData);
                    setCards(cardsData);
                })
                .catch((err) => {
                    console.log("initialCards", err);
                });
        }
    }, [loggedIn]);

    const handleCardDelete = (id) => {
        api.delImage(id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== id));
            })
            .catch((err) => {
                console.log("deletingCard", err);
            });
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        console.log(isLiked);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
            })
            .catch((err) => {
                console.log("likeCard", err);
            });
    }

    function handleUpdateUser(userData) {
        api.editProfile(userData.name, userData.about)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log("editProfile", err);
            });
    }

    function handleUpdateAvatar(avatarData) {
        api.changeAvatar(avatarData.avatar)
            .then((avatarData) => {
                setCurrentUser(avatarData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log("updateAvatarError", err);
            });
    }

    function handleAddPlaceSubmit(newCard) {
        api.addImage(newCard.name, newCard.link, newCard.likes)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log("updateAddPlaceError", err);
            });
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsRegisterPopupOpen(false);
        setSelectedCard({ name: "", link: "" });
    }

    function handleLogin() {
        setLoggedIn(true);
    }

    useEffect(() => {
        tokenCheck();
    }, []);

    function tokenCheck() {
        const token = localStorage.getItem("token");
        if (token) {
            api.setToken(token)
            auth.getContent(token)
                .then((res) => {
                    if (res) {
                        const userData = {
                            about: res.about,
                            avatar: res.avatar,
                            email: res.email,
                            name: res.name,
                        };
                        setEmail(userData.email);
                        setCurrentUser(userData);
                        setLoggedIn(true);
                        navigate("/", { replace: true });
                    }
                })
                .catch((err) => {
                    console.log("TokenCheckError", err);
                });
        }
    }

    function handleRegister() {
        setIsRegisterPopupOpen(true);
    }

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setRegisterInfo("Введите почту и пароль");
            handleRegister();
            return;
        }
        auth.authorize(email, password)
            .then((data) => {
                if (data.token) {
                    setEmail(email);
                    setPassword("");
                    handleLogin();
                    navigate("/", { replace: true });
                    tokenCheck();
                }
            })
            .catch((err) => {
                console.log("Login", err);
                setRegisterInfo("Что-то пошло не так! Попробуйте ещё раз.");
                handleRegister();
            });
    };

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        auth.register(email, password)
            .then((res) => {
                if (res) {
                    setRegisterInfo("Вы успешно зарегистрировались!");
                    setRegisterStatus(true);
                    handleRegister();
                    navigate("/sign-in", { replace: true });
                }
            })
            .catch((err) => {
                console.log("Error", err);
                setRegisterInfo("Что-то пошло не так! Попробуйте ещё раз.");
                handleRegister();
            });
    };

    return (
        <div>
            <CurrentUserContext.Provider value={currentUser}>
                <Header userEmail={email} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute
                                element={Main}
                                loggedIn={loggedIn}
                                onEditProfile={() => setIsEditProfilePopupOpen(true)}
                                onAddPlace={() => setIsAddPlacePopupOpen(true)}
                                onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                                onCardClick={setSelectedCard}
                                cards={cards}
                                onCardDelete={handleCardDelete}
                                onCardLike={handleCardLike}
                            />
                        }
                    />
                    <Route
                        path="/sign-up"
                        element={
                            <Register
                                handleEmailChange={handleEmailChange}
                                handlePasswordChange={handlePasswordChange}
                                handleSubmitRegister={handleSubmitRegister}
                            />
                        }
                    />
                    <Route
                        path="/sign-in"
                        element={
                            <Login
                                handleSubmitLogin={handleSubmitLogin}
                                handleEmailChange={handleEmailChange}
                                handlePasswordChange={handlePasswordChange}
                            />
                        }
                    />
                </Routes>

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <InfoTooltip
                    isOpen={isRegisterPopupOpen}
                    onClose={closeAllPopups}
                    registerInfo={registerInfo}
                    registerStatus={registerStatus}
                />
                {loggedIn && <Footer />}
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
