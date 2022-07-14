import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: 'Public Sans', system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Arial,
    sans-serif;
    background: #f6f6f8;
    // Micro-typography / font rendering
	font-feature-settings  : "pnum", "kern", "liga";
	text-rendering         : optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
`
export default GlobalStyle;