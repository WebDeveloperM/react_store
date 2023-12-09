import React from 'react';
import Menu from "./Menu";

export default function Layout({ children }) {
    return (
        <div className="columns">
            <div className="column is-2 has-background-info-light">
                <Menu />
            </div>
            <div className="column">
                {children}
            </div>
        </div>
    );
}
