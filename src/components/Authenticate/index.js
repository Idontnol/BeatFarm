import React, { useState } from "react";
import './index.css';

const SignUpLoginModal = (props) => {
    const {setShowSignUpModal}=props;
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: isLogin ? "" : ""
    });
    // const [showModal, setShowModal] = useState(false);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSignUpModal(false);
        setFormData({
            email: "",
            password: "",
            name: isLogin ? "" : ""
        });
    };

    return (
        <div>
            {/* <button className="open-modal-button" onClick={() => setShowModal(true)}>
                {isLogin ? 'Login' : 'Sign Up'}
            </button> */}

            {true && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                            <button className="close-button" onClick={() => setShowSignUpModal(false)}>×</button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="submit-button">
                                {isLogin ? "Login" : "Sign Up"}
                            </button>

                            <div className="toggle-text">
                                <p>
                                    {isLogin
                                        ? "Don't have an account?"
                                        : "Already have an account?"}
                                    <span onClick={toggleForm} className="toggle-link">
                                        {isLogin ? " Sign up" : " Login"}
                                    </span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUpLoginModal;
