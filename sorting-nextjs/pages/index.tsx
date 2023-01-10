import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Screen from "./Screen";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Carl's sorting</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Screen />
    </div>
  );
}
