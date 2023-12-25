import React from 'react'

interface props{
    amount:number
}
const FormattedPrice = ({amount}:props) => {
  
  const formattedAmount=new Number(amount).toLocaleString("en-US",{
    style:"currency",
    currency:"USD",
    minimumFractionDigits:2
  })
    return (
   <span> { formattedAmount}</span>
  )
}

export default FormattedPrice
