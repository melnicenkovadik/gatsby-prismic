import React from "react";

const Button = ({isShowing, hide}) => {

    return (
        <button className="button-default" onClick={hide}>
            <>
                <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    className="button"
                >
                    <rect
                        x="1"
                        y="1"
                        width="40"
                        height="40"
                        rx="20"
                        stroke="#CCCCCC"
                        strokeOpacity="0.1"
                        strokeWidth="2"
                    />
                    <rect
                        x="1"
                        y="1"
                        width="40"
                        height="40"
                        rx="20"
                        stroke="#CCCCCC"
                        strokeWidth="2"
                        strokeOpacity="0.6"
                        className="square-hover"
                    />
                </svg>
                <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    className="button"
                >
                    <path
                        id="arrow"
                        d="M17.5898 26.59L22.1698 22L17.5898 17.41L18.9998 16L24.9998 22L18.9998 28L17.5898 26.59Z"
                        fill="#CCCCCC"
                    />
                </svg>
            </>
        </button>
    );
};

export default Button;
