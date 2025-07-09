import ProductPage from '@/components/Productpage'
import React from 'react'
import { Toaster } from 'react-hot-toast'

function page() {
  return (
    <div>
      <Toaster position="top-right" gutter={12} toastOptions={{style: {transition: 'all 0.5s ease-in-out', },}}/>
      <ProductPage/>
      </div>
  )
}

export default page