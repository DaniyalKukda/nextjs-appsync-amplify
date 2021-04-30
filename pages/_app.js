import '../styles/globals.css'
import awsExports from "../src/aws-exports";
import { Amplify } from "aws-amplify";

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
