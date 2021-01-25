import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import theme from 'styled-theming';


export const backgroundColor = theme("theme", {
    light: "#fef9f8",
    dark: "#15202B"
});

export const textColor = theme("theme", {
    light: "#000000",
    dark: "#ffffff"
});

export const buttonColor = theme("theme", {
    light: "#A9A9A9",
    dark: "#D3D3D3"
});

export const footerColor = theme("theme", {
    light: "#404040",
    dark: "#22303C"
});

const DarkThemeProvider = ({ children }) => {
    const darkThemeEnabled = useSelector((state) => state.theme.darkThemeEnabled);
    return (
        <ThemeProvider theme={{ theme: darkThemeEnabled ? "dark" : "light" }}>
            {children}
        </ThemeProvider>
    );
};


export default DarkThemeProvider;
