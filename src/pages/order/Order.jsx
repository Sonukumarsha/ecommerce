import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/loader/Loader'

function Order() {
  // Fix localStorage key and add error handling
  let user = {};
  let userid = '';
  
  try {
    user = JSON.parse(localStorage.getItem('user') || '{}');
    userid = user?._id || user?.user?.uid || user?.uid || '';
  } catch (error) {
    console.error('Error parsing user data:', error);
  }
  
  const context = useContext(myContext)
  const { mode, loading, order } = context

  console.log('Current user ID:', userid);
  console.log('Available orders:', order);
  console.log('User data:', user);

  // Filter orders for current user
  const userOrders = order?.filter(obj => {
    const matches = obj.userId === userid || obj.userid === userid;
    console.log('Order check - Order userId:', obj.userId, 'Current user:', userid, 'Matches:', matches);
    return matches;
  }) || [];

  console.log('Filtered user orders:', userOrders);

  return (
    <Layout>
      {loading && <Loader />}
      {userOrders.length > 0 ?
        (<>
          <div className="h-full pt-10">
            <h1 className="text-center text-2xl font-bold mb-8" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
              Your Orders
            </h1>
            {
              userOrders.map((order, orderIndex) => {
                return (
                  <div key={orderIndex} className="mx-auto max-w-5xl justify-center px-6 mb-8">
                    <div className="bg-gray-100 p-4 rounded-lg mb-4" style={{ backgroundColor: mode === 'dark' ? '#374151' : '', color: mode === 'dark' ? 'white' : '' }}>
                      <h3 className="font-semibold">Order #{orderIndex + 1}</h3>
                      <p>Order Date: {order.date}</p>
                      <p>Payment ID: {order.paymentId}</p>
                      {order.addressInfo && (
                        <p>Delivery Address: {order.addressInfo.address}, {order.addressInfo.pincode}</p>
                      )}
                    </div>
                    <div className="grid gap-4">
                      {
                        order.cartItems && order.cartItems.map((item, itemIndex) => {
                          return (
                            <div key={itemIndex} className="rounded-lg bg-white p-6 shadow-md" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
                              <div className="flex flex-col sm:flex-row">
                                <img src={item.imageUrl} alt="product-image" className="w-full sm:w-40 h-40 object-cover rounded-lg" />
                                <div className="sm:ml-4 flex-1 mt-4 sm:mt-0">
                                  <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                                  <p className="mt-1 text-sm text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</p>
                                  <p className="mt-2 text-lg font-semibold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{item.price}</p>
                                  <p className="mt-1 text-sm text-gray-600" style={{ color: mode === 'dark' ? 'lightgray' : '' }}>Category: {item.category}</p>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </>)
        :
        (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
              {userid ? 'No Orders Found' : 'Please login to view orders'}
            </h2>
            <p className="text-gray-500 mt-2" style={{ color: mode === 'dark' ? 'gray' : '' }}>
              {userid ? 'You haven\'t placed any orders yet.' : 'You need to be logged in to see your orders.'}
            </p>
            {userid && (
              <div className="mt-4 text-sm text-gray-400">
                <p>Debug Info:</p>
                <p>User ID: {userid}</p>
                <p>Total Orders in System: {order?.length || 0}</p>
              </div>
            )}
          </div>
        )
      }
    </Layout>
  )
}

export default Order