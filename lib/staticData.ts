// 정적 data

// 월
export const monthList = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

// 1~31일
export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

// 현재년도부터 1900년까지
let date = new Date();
const year = date.getFullYear();
export const yearList = Array.from(Array(121), (_, i) => String(year - i));
