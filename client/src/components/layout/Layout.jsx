import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signOut } from "../auth/helpers";

const Layout = ({ children, match, history }) => {
    const isActive = (path) => {
        if (match.path === path) return { color: "#000" };
        else return { color: "#fff" };
    };

    const nav = () => (
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link to="/" className="nav-link" style={isActive("/")}>
                    Home
                </Link>
            </li>
            {
                !isAuth() && (
                    <>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link" style={isActive("/signup")}>
                                Signup
                        </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signin" className="nav-link" style={isActive("/signin")}>
                                Signin
                        </Link>
                        </li>
                    </>
                )
            }
            {
                isAuth() && isAuth().role === 'admin' && (
                    <>
                        <li className="nav-item">
                            <li
                                className="nav-link"
                                style={{ cursor: 'pointer', color: '#fff' }}
                                onClick={() => {
                                    signOut(() => {
                                        history.push('/')
                                    })
                                }}
                            >signoit admin {isAuth().name}</li>
                        </li>
                    </>
                )
            }
            {
                isAuth() && isAuth().role === 'subscriber' && (
                    <>
                        <li className="nav-item">
                            <li
                                className="nav-link"
                                style={{ cursor: 'pointer', color: '#fff' }}
                                onClick={() => {
                                    signOut(() => {
                                        history.push('/')
                                    })
                                }}
                            >signout {isAuth().name}</li>
                        </li>
                    </>
                )
            }
        </ul>
    );

    return (
        <>
            {nav()}
            <div className="container">{children}</div>
        </>
    );
};

export default withRouter(Layout);
