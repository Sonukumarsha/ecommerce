import React, { useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Testimonial from '../../components/testimonial/Testimonial'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'
function Home  () {
  const dispatch = useDispatch()
  const cartItem = useSelector((state) => state.cart)

  // Removed console logs for cleaner console output
  

  // useEffect(() => {
  //   console.log("Cart update:", cartItem);
  // }, [cartItem]); 

  const addCart = ()=>{
    dispatch(addToCart("shirt"));
  }
  const deleteCart = ()=>{
    dispatch(deleteFromCart("shirt"));
  }




  return (
    <Layout>
      <div className='flex  gap-5 justify-center'>
        <button className='bg-gray-300 p-5' onClick={addCart}>Add to Cart</button>
        <button className='bg-gray-300 p-5' onClick={deleteCart}>Delete from Cart</button>
        <h1>Cart Items: {cartItem.length}</h1>
      </div>

      <HeroSection/>
      <Filter/>
      <ProductCard/>
      {/* <Testimonial/> */}
    </Layout>
  )
}

export default Home