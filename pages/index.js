import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { generateAddress } from "../lib/fakerjs"
import { useState , useEffect } from "react"
import { createAddress } from "../src/graphql/mutations";
import { getAllPaginatedData } from "../src/graphql/queries";
import { API } from "@aws-amplify/api";

export default function Home() {
  const [address, setAddress] = useState({});
  const [listData , setlistData] = useState([])
  const saveAddress = async () => {
    try {
      const result = await API.graphql({
        query: createAddress,
        variables: {
          input: address,
        },
      });
      getTotalCounts();
    } catch (err) {
      console.log(err);
    }
  }
  const getTotalCounts = async () => {
    try {
      const {data} = await API.graphql({
        query: getAllPaginatedData
      });
      setlistData(data.listAllAddress)
    } catch (err) {
      console.log(err);
    }
  } 
  useEffect(() => {
    getTotalCounts()
  },[])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
         Total Address Count is {listData.length}
        </p>

        <div>
          <button onClick={() => setAddress(generateAddress())}>
            Generate Address
          </button>
          <div>
            {
              Object.keys(address).map((v) => (<p key={v}>{v} : {address[v]}</p>))
            }
          </div>
          <button onClick={() => saveAddress()}>
            Save Address
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
