import React from "react";

const ListItem = ({ children }) => {
    console.count("render list item");
    return (
        <li>
            {children}
            <label style={{ fontSize: "smaller" }}>
                <input type="checkbox" />
                Add to cart
            </label>
        </li>
    );
}

export default React.memo(ListItem);