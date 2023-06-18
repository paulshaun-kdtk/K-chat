import Head from 'next/head'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import HomePage from '@/components/HomePage'




//end imports

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Kchat</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/K.png" />
      </Head>
      <main > 
       <Sidebar />
       <HomePage />
         </main>
    </>
  )
}

