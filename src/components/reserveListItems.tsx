import { useRecoilState } from "recoil";
import { ReserveProp } from "./modal";
import { reserveState } from "@/lib/recoilState";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function ReserveListItems() {
  const [reserveList, setReserveList] = useRecoilState<ReserveProp[]>(reserveState);
  const router = useRouter();

  return (
    <>
      {reserveList.map((list) => (
        <motion.div
          key={list?.id}
          layoutId={String(list?.id)}
          className="mt-10 w-60 h-48 border border-gray-400 rounded-md flex flex-col justify-center px-4 py-4 bg-white text-xs text-gray-500 space-y-4"
        >
          <div>No. {list?.id}</div>
          <div>닉네임: {list?.nickname} 님</div>
          <div>예약 날짜: {list?.reserveDate}</div>
          <div>픽업 날짜: {list?.pickupDate}</div>
          <button
            className="border border-blue-500 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            onClick={() => router.push(`/?id=${list?.id}`)}
          >
            상세 정보
          </button>
        </motion.div>
      ))}
    </>
  );
}
