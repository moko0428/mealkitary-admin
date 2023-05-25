import Layout from "@/components/layout";
import Modal from "@/components/modal";
import { modalState } from "@/lib/recoilState";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Home() {
  const [reservation, setReservation] = useRecoilState(modalState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReservation(1);
    }, 8000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Layout>
      <div className="pt-16 px-2 h-[36rem] flex justify-center relative">
        {reservation ? <Modal /> : ""}
        <div className="absolute top-36">예약 대기 중...</div>
      </div>
      {reservation ? (
        <div className="bg-[rgba(0,0,0,0.2)] fixed top-0 left-0 z-10 w-screen h-screen"></div>
      ) : (
        ""
      )}
    </Layout>
  );
}
