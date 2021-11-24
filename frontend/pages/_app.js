import Head from 'next/head'

import { AuthProvider } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <link rel='icon' href='/logo.png' />
        <link rel='preload' href='/fonts/Gauntlet/gauntletthin_tb.otf' as='font' crossOrigin='' />
        <link href='https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap' rel='stylesheet'></link>
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </AuthProvider>
  )
}

export default MyApp
