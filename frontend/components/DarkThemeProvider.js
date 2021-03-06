import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { MuiThemeProvider, StylesProvider, createMuiTheme } from "@material-ui/core/styles";
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

export const cardColor = theme("theme", {
    light: "#ffffff",
    dark: "#22303c"
});

export const backgroundSecondary = theme("theme", {
    light: "rgb(231, 231, 231)",
    dark: "#192734"
})

export const footerFont = theme("theme", {
    light: "#f9f9f9",
    dark: "#ffffff"
})

const dark = createMuiTheme({
    palette: {
        type: "dark",
        backgroundColor: "#15202B",
        textColor: "#ffffff",
        buttonColor: "#d3d3d3",
        footerColor: "#22303c",
        cardColor: "#22303C",
        blobColor: "#212121",
        splashBlob: "#9c5142",
        backgroundSecondary: "#192734",
        footerFont: "#ffffff"
    },
});

const light = createMuiTheme({
    palette: {
        type: "light",
        backgroundColor: "#fef9f8",
        textColor: "#000000",
        buttonColor: "#A9A9A9",
        footerColor: "#404040",
        cardColor: "#ffffff",
        blobColor: "#f7f7f7",
        splashBlob: '#D0E2FF',
        backgroundSecondary: "rgb(231, 231, 231)",
        footerFont: "#f9f9f9"
    }
});


const DarkThemeProvider = ({ children }) => {
    const darkThemeEnabled = useSelector((state) => state.theme.darkThemeEnabled);
    const themeSelected = darkThemeEnabled ? "dark" : "light";
    const muiTheme = darkThemeEnabled ? dark : light;

    return (
        <StylesProvider injectFirst>
            <MuiThemeProvider theme={ muiTheme  } >
                <ThemeProvider theme={{ theme: themeSelected }}>
                    {children}
                </ThemeProvider>
            </MuiThemeProvider>
        </StylesProvider>
    );
};


export default DarkThemeProvider;
