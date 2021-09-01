import { AppProps } from "next/dist/shared/lib/router/router";
import GlobalStyle from "../styles/GlobalStyle";
const app = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
};

export default app;
