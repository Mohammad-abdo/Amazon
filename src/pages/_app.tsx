import RootLayout from '@/Components/RootLayout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Provider } from 'react-redux'
import { persistor, store } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react'
import { SessionProvider } from "next-auth/react"
import { LanguageProvider } from '@/contexts/LanguageContext'


  const  App = ({ Component, pageProps:{ session, ...pageProps } }: AppProps)=> {
  return (
    <LanguageProvider>
    <Provider store={store}>

      <PersistGate persistor={persistor} loading={null}>
    <SessionProvider session={session}>
          <div className='font-bodyFont bg-surface min-h-screen flex flex-col justify-between'>
               <RootLayout>
   <Component {...pageProps} />
   </RootLayout>

  </div>
    </SessionProvider>

      </PersistGate>

    </Provider>
    </LanguageProvider>

  );
}
export default   App 