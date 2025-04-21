import AddProduct from '@/app/Components/DashBoard/AddProduct'
import UserLogin from '@/app/Components/homePage_Components/UserLogin'
import React from 'react'


function page() {
  return (
    <div>
      <UserLogin/>
      <AddProduct/>
    </div>
  )
}

export default page
