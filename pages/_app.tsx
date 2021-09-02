import React from "react";
import { AppProps } from "next/dist/shared/lib/router/router";
import GlobalStyle from "../styles/GlobalStyle";
import { wrapper } from "store";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
      {/* createPortal */}
      {/* 첫 번쨰 인자 : react component , 두 번째 인자 : react component를 넣을 DOM */}
      {/* root-modal에 렌더링 하도록 한다. 받은 children 컴포넌트는 항상 black background를 보이게 할 것임 */}
      <div id="root-modal" />
    </>
  );
};

export default wrapper.withRedux(app);
