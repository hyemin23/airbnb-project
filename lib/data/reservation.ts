import { StoredReservation } from "./../../types/reservation.d";
import { readFileSync, writeFileSync } from "fs";
// * 예약 리스트 불러오기
const getList = () => {
  const reservationsBuffer = readFileSync("data/reservations.json");
  const reservationsString = reservationsBuffer.toString();

  if (!reservationsString) {
    return [];
  }

  const reservations: StoredReservation[] = JSON.parse(reservationsString);
  return reservations;
};

// * id의 예약이 있는지 확인
const exist = (reservationId: number) => {
  const reservations = getList();
  return reservations.some((room) => room.id === reservationId);
};

// * id의 예약 불러오기
const find = (reservationId: number) => {
  const reservation = getList();
  return reservation.find((room) => room.id === reservationId);
};

// * 예약 리스트 저장
const write = (reservations: StoredReservation[]) => {
  return writeFileSync("data/reservation.json", JSON.stringify(reservations));
};

export default { getList, exist, find, write };
