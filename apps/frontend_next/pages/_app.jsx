import "../styles/globals.css";
import { SpeechProvider } from "../hooks/useSpeech";

export default function MyApp({ Component, pageProps }) {
  return (
    <SpeechProvider>
      <Component {...pageProps} />
    </SpeechProvider>
  );
} 