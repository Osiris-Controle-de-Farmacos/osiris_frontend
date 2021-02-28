import React from "react";
import Layout from "./Pages/Layout";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
function App() {
	const theme = createMuiTheme({
		palette: {
			primary: {
				main: "#900000",
			},
			secondary: {
				main: "#11871D",
			},
		},
		typography: {
			fontFamily: "Opens Sans, sans-serif",
			h3: {
				fontFamily: "Dosis, sans-serif",
			},
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Layout />
		</ThemeProvider>
	);
}

export default App;
