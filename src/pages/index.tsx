
import Banner from '@/Components/Banner'
import Products from '@/Components/Products/Products'
import { productProps } from '../../type';
    

interface props{
  productData:productProps
}

export default function Home({productData}:props) {

  return (
    <main className="" >
<div className="max-w-screen-2xl mx-auto">
  <Banner/>
<div className=" relative md:-mt-20 xl:-mt-60 lgl:-mt-32 z-20 mb-10">
<Products productData={productData}/>
</div>
</div>
    </main>
  )
}

export const getServerSideProps=async () => {
  const res=await fetch("https://fakestoreapiserver.reactbd.com/tech")
 const productData=await res.json()

 return {props:{productData}}
  
}