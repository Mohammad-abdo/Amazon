import React ,{ReactElement } from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import BottomHeader from './Header/BottomHeader'


interface props{
    children:ReactElement
}
const RootLayout = ({children}:props) => {
  return (
    <div>
        <Header/>
        <BottomHeader/>
      {children}
      <Footer/>
    </div>
  )
}

export default RootLayout
