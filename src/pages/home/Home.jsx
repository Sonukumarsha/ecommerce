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

      {/* Cart Items Display */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Cart Items</h2>
        {cartItem.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItem.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition-shadow">
                {typeof item === 'string' ? (
                  // Display for simple string items (test data)
                  <div className="text-center">
                    <div className="bg-gray-200 h-32 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                    <h3 className="text-lg font-semibold">{item}</h3>
                    <p className="text-gray-600">Test Item</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-lg font-bold text-green-600">₹0</span>
                      <button 
                        onClick={() => dispatch(deleteFromCart(item))}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  // Display for actual product objects
                  <div className="text-center">
                    <div className="h-32 rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={item.imageUrl || 'https://via.placeholder.com/150'} 
                        alt={item.title || 'Product'} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold truncate">{item.title || 'Unknown Product'}</h3>
                    <p className="text-gray-600 text-sm">{item.category || 'No Category'}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-lg font-bold text-green-600">
                        ₹{item.price || '0'}
                      </span>
                      <button 
                        onClick={() => dispatch(deleteFromCart(item))}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Cart Summary */}
        {cartItem.length > 0 && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Total Items: {cartItem.length}</span>
              <button className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700">
                View Full Cart
              </button>
            </div>
          </div>
        )}
      </div>

      <HeroSection/>
      <Filter/>
      <ProductCard/>
      <Testimonial/>
    </Layout>
  )
}

export default Home