import React from "react";
import ReactDom from "react-dom/client";
import "./utils/reset.css";
import { GlobalStyle, theme } from "./utils/global.style.jsx";
import App from "./components/App";
import { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
	<ThemeProvider theme={theme}>
		<Helmet>
			<link
				href="https://fonts.googleapis.com/earlyaccess/notosanstc.css"
				rel="stylesheet"
			/>
		</Helmet>
		<GlobalStyle />
		<App />
	</ThemeProvider>
);
