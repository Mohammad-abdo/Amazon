import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import Header from '@/Components/Header/Header'
import BottomHeader from '@/Components/Header/BottomHeader'
export default function Home() {
  return (
    <main className="" >
 <Header/>
 <BottomHeader/>
    </main>
  )
}
