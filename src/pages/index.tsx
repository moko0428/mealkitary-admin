import Layout from "@/components/layout";
import Modal, { ReserveProp } from "@/components/modal";
import { modalState, reserveState } from "@/lib/recoilState";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import DetailModal from "@/components/detailModal";
import reserveListData from "@/data/reserveList.json";
import ReserveListItems from "@/components/reserveListItems";

export default function Home() {
  const [reservation, setReservation] = useRecoilState(modalState);
  const [reserveList, setReserveList] = useRecoilState<ReserveProp[]>(reserveState);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setReservation(1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setReserveList(reserveListData);
  }, []);

  return (
    <Layout>
      <div className="px-8 flex justify-center relative mb-10">
        {reservation ? <Modal /> : ""}
        {router.query.id ? <DetailModal /> : ""}
        {reserveList.length !== 0 ? (
          <div className="grid gap-x-20 gap-y-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            <ReserveListItems />
          </div>
        ) : (
          <div className="absolute top-24 text-base">등록된 예약이 없습니다.</div>
        )}
      </div>

      {reservation ? (
        <div className="bg-[rgba(0,0,0,0.2)] fixed top-0 left-0 z-10 w-screen h-screen"></div>
      ) : (
        ""
      )}
    </Layout>
  );
}
