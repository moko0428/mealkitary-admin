import { modalState } from "@/lib/recoilState";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

const Timer = () => {
  const [time, setTime] = useState(5 * 60); // 초 단위로 남은 시간 저장
  const [reservation, setReservation] = useRecoilState(modalState);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000); // 1초마다 타이머 갱신

    return () => {
      clearInterval(timerRef.current); // 컴포넌트가 언마운트되면 타이머를 정리
    };
  }, []);

  useEffect(() => {
    if (time <= 0) {
      // 0분 0초가 되었을 때 타이머 종료 로직 추가
      clearInterval(timerRef.current); // 타이머 정리
      setReservation(0);
      // 다른 종료 로직 수행
    }
  }, [time]);

  // 분과 초로 남은 시간 변환
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div>
      <div>
        남은 시간: {minutes}분 {seconds}초
      </div>
    </div>
  );
};

export default Timer;
