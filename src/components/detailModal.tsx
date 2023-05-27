import { modalState, reserveState } from "@/lib/recoilState";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ReserveProp } from "./modal";

export default function DetailModal() {
  const [reserveList, setReserveList] = useRecoilState<ReserveProp[]>(reserveState);
  const router = useRouter();

  const [detailData, setDetailData] = useState<ReserveProp[]>();

  const onSellClick = () => {
    const updateReserveList = reserveList.filter(
      (reserve) => reserve.id !== Number(router.query.id)
    );
    setReserveList(updateReserveList);
    router.push("/");
  };

  useEffect(() => {
    const data = reserveList.filter((reserve) => reserve.id === Number(router.query.id));
    setDetailData(data);
  }, [router]);

  return (
    <>
      {detailData ? (
        <motion.div
          layoutId={String(router.query.id)}
          className="absolute left-0 right-0 mx-auto mt-10 w-[36rem] h-[27.5rem] border border-gray-400 rounded-md flex flex-col px-4 py-4 bg-white z-20"
        >
          <div className="flex justify-between text-gray-500 text-sm">
            <div className="text-gray-500 mb-5 text-sm">NO. {detailData[0].id}</div>
          </div>
          <div className="flex mb-10">
            {detailData[0].image ? (
              <div className="w-12 h-12 rounded-full bg-slate-400 mr-3 relative overflow-hidden">
                <Image src={detailData[0].image} alt="프로필 이미지" layout="fill" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-400 mr-3"></div>
            )}
            <div className="text-base font-semibold">{detailData[0].nickname} 님</div>
          </div>
          <ul className="flex flex-col text-sm text-gray-500 mb-10">
            {detailData[0].menu.map((menu) => (
              <li key={menu.id} className="flex justify-between">
                <div>
                  {menu.name} x{menu.count}
                </div>
                <div>{menu.price.toLocaleString()} 원</div>
              </li>
            ))}
          </ul>
          <div className=" text-sm text-gray-500 mb-8">
            <div>예약 날짜: {detailData[0].reserveDate}</div>
            <div>픽업 날짜: {detailData[0].pickupDate}</div>
          </div>
          <div className="text-right text-sm text-gray-500 mb-10">
            총 가격: {detailData[0].totalPrice.toLocaleString()} 원
          </div>
          <div className="flex justify-around">
            <button
              className="text-white bg-blue-600 text-sm px-7 py-2 border border-blue-600 rounded-sm hover:bg-blue-700"
              onClick={onSellClick}
            >
              판매 완료
            </button>
            <button
              className="text-blue-600 bg-white text-sm px-11 py-2 border border-blue-500 rounded-sm hover:bg-gray-100"
              onClick={() => router.push("/")}
            >
              닫기
            </button>
          </div>
        </motion.div>
      ) : (
        ""
      )}
    </>
  );
}
