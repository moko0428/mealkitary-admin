import type { AppProps } from "next/app";
import "../styles/globals.css";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div className="w-full">
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}
