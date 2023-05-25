import Timer from "@/components/timer";
import Reserve from "@/data/reservation.json";
import { modalState } from "@/lib/recoilState";
import Image from "next/image";
import { useState } from "react";
import { useRecoilState } from "recoil";

interface MenuProp {
  id: number;
  name: string;
  count: number;
  price: number;
}

interface ReserveProp {
  id: number;
  nickname: string;
  image?: string;
  menu: MenuProp[];
  reserveDate: string;
  pickupDate: string;
  totalPrice: number;
}

export default function Modal() {
  const [reserveData, setReserveData] = useState<ReserveProp>(Reserve);
  const [reservation, setReservation] = useRecoilState(modalState);
  return (
    <div className="mt-10 w-[36rem] h-[27.5rem] border border-gray-400 rounded-md flex flex-col px-4 py-4 bg-slate-200 z-20">
      <div className="flex justify-between text-gray-500 text-sm">
        <div className="text-gray-500 mb-5 text-sm">NO. {reserveData.id}</div>
        <Timer />
      </div>
      <div className="flex mb-10">
        {reserveData.image ? (
          <div className="w-12 h-12 rounded-full bg-slate-400 mr-3 relative overflow-hidden">
            <Image src={reserveData.image} alt="프로필 이미지" layout="fill" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-slate-400 mr-3"></div>
        )}
        <div className="text-base font-semibold">{reserveData.nickname} 님</div>
      </div>
      <ul className="flex flex-col text-sm text-gray-500 mb-10">
        {reserveData.menu.map((menu) => (
          <li key={menu.id} className="flex justify-between">
            <div>
              {menu.name} x{menu.count}
            </div>
            <div>{menu.price.toLocaleString()} 원</div>
          </li>
        ))}
      </ul>
      <div className=" text-sm text-gray-500 mb-8">
        <div>예약 날짜: {reserveData.reserveDate}</div>
        <div>픽업 날짜: {reserveData.pickupDate}</div>
      </div>
      <div className="text-right text-sm text-gray-500 mb-10">
        총 가격: {reserveData.totalPrice.toLocaleString()} 원
      </div>
      <div className="flex justify-around">
        <button
          className="text-white bg-blue-600 text-sm px-7 py-2 border border-blue-600 hover:bg-blue-700"
          onClick={() => setReservation(0)}
        >
          수락하기
        </button>
        <button
          className="text-blue-600 bg-white text-sm px-7 py-2 border border-blue-500 hover:bg-gray-100"
          onClick={() => setReservation(0)}
        >
          거절하기
        </button>
      </div>
    </div>
  );
}
