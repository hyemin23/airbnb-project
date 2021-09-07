// 쿠키 문자열에서 access_token을 추출하는 함수
// "token=value"를 {token : "value"}로 바꾸는 함수
export const cookieStringToObject = (cookieString: string | undefined) => {
  const cookies: { [key: string]: string } = {};

  if (cookieString) {
    // * "token = value"
    //   whitespace , ; 를 기준으로 찾음
    const itemString = cookieString?.split(/\s*;\s*/);

    itemString?.forEach((item) => {
      //  * ["token","value"]
      // "="를 기준으로 찾아서 split
      const pair = item.split(/\s*=\s*/);

      // 어떤 배열의 begin부터 end까지(end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환합니다. 원본 배열은 바뀌지 않습니다.
      // join : 구분문자로 구분해서 하나의 문자열로 만들어줌
      //   console.log(pair.slice(1).join(":"));
      cookies[pair[0]] = pair.slice(1).join("=");
    });
  }
  return cookies;
};

// string에서 number만 빼내는 함수
export const getNumber = (string: string) => {
  const numbers = string.match(/\d/g)?.join("");

  if (numbers) {
    return Number(numbers);
  }
  return null;
};

//* 금액을 입력하면 금액에 ,를 넣어주는 함수
export const makeMoneyToString = (inputValue: string) => {
  const amountString = inputValue.replace(/[^0-9]/g, "");

  if (amountString) {
    return parseInt(amountString, 10).toLocaleString();
  }
  return "0";
};
