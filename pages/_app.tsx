import React from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { wrapper } from "store";
import App, { AppContext } from "next/app";
import { cookieStringToObject } from "lib/utill";
import axios from "lib/api";
import { meAPI } from "lib/api/auth";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { userAction } from "@/store/user";

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

// 모든 페이지에서 로그인 정보를 불러올 수 있도록 App 컴포넌트의
// getInitialProps 메서드를 오버라이드하여 사용한다.
// 아마 next version이 올라가면서 사용하는 방법이 달라짐 버전을 낮춰서 사용하면 됨.
app.getInitialProps = async (context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);

  // next-redux-wrapper때문에 AppContext에서 store 사용 가능
  const { store } = context.ctx;
  const { isLogged } = store.getState().user;

  try {
    // 로그인되어있고 토큰이 존재하면 요청을 보냄
    if (!isLogged && cookieObject.access_token) {
      // const { data } = await meAPI();
      axios.defaults.headers.cookie = cookieObject.access_token;
      const { data } = await axios.get("http://localhost:3000/api/auth/loadMyData");

      // redux store에 저장 -> 새로고침 해도 로그인 유지
      store.dispatch(userAction.setLoggedUser(data));
    }
  } catch (error) {
    console.log(error);
  }

  // 구해진 access 토큰에 api 요청을 헤더에 함게 보냄
  axios.defaults.headers.cookie = cookieObject.access_token;

  return { ...appInitialProps };
};

export default wrapper.withRedux(app);
