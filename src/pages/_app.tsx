import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'

import '../styles/global.scss'


function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [showSidebar, setShowSidebar] = useState(false)

  function handleOpenSidebar() {
    setShowSidebar(true)
  }

  function handleHiddeSidebar() {
    setShowSidebar(false)
  }

  return (
    <SessionProvider session={session}>
      <Header onShowSidebar={handleOpenSidebar}/>
      <Sidebar visible={showSidebar} onHidde={handleHiddeSidebar}/>

      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App
