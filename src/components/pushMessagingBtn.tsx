import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";

const firebaseApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH,
  projectId: "ex-fcm-efa3f",
  storageBucket: "ex-fcm-efa3f.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
});
const messaging = getMessaging(firebaseApp);

const PushMessagingBtn = async () => {
  //브라우저에 알림 권한을 요청함.
  const permission = await Notification.requestPermission();
  // 권한이 부여되지 않으면 이후의 로직을 실행하지 않고 종료함.
  if (permission !== "granted") return;

  getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_VAPID,
  })
    .then((currentToken) => {
      if (currentToken) {
        // 정상적으로 토큰이 발급되면 콘솔에 출력함.
        console.log(currentToken);
      } else {
        console.log("예기치 않은 오류로 토큰 발급 불가");
      }
    })
    .catch((err) => {
      console.log("예기치 않은 오류 발생", err);
    });
  onMessage(messaging, (payload) => {
    console.log("Message received.", payload);
  });
};
export default PushMessagingBtn;
