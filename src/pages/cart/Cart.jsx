import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteFromCart } from '../../redux/cartSlice';
import { collection, addDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';


function Cart() {

  const context = useContext(myContext)
  const { mode } = context;

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);


  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart")
  }


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      const price = parseFloat(cartItem.price) || 0;
      temp = temp + price;
    });
    setTotalAmount(temp);
    console.log("Subtotal:", temp);
  }, [cartItems]);

  const shipping = 20; // Fixed shipping cost
  const grandTotal = totalAmount + shipping;
  console.log("Grand Total:", grandTotal);

  const [name, setName] = useState("")
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")

  const buyNow = async () => {
    // Check if cart is empty
    if (cartItems.length === 0) {
      return toast.error("Your cart is empty", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      })
    }

    if (!name || !pincode || !phoneNumber || !address) {
      return toast.error("Please fill all the details", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      })
    }

    // Check if grandTotal is valid
    if (grandTotal <= 0 || isNaN(grandTotal)) {
      return toast.error("Invalid total amount", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      })
    }

    const addressInfo = {
      name: name,
      pincode: pincode,
      phoneNumber: phoneNumber,
      address: address,
      date: new Date().toLocaleDateString(
        "en-US",
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }
      )
    }

    var options = {
      key: "rzp_test_O5cE57qPVujaMZ", // Replace with your Razorpay key
      amount: parseInt(grandTotal * 100), // Amount in paise
      currency: "INR",
      name: "E-Bharat",
      description: "Order for E-commerce purchase",
      prefill: {
        name: name,
        email: JSON.parse(localStorage.getItem('user'))?.email || '',
        contact: phoneNumber
      },
      notes: {
        address: address
      },
      handler: async function (response) {
        console.log(response);
        toast.success("Payment Successful");

        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
          cartItems,
          paymentId,
          addressInfo,
          date: new Date().toLocaleDateString(
            "en-US",
            {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }
          ),
          email: JSON.parse(localStorage.getItem('user'))?.email || '',
          userId: JSON.parse(localStorage.getItem('user'))?._id || '',
        }

        try {
          const orderRef = collection(fireDB, "order");
          await addDoc(orderRef, orderInfo);
          toast.success("Order placed successfully");
        } catch (error) {
          console.log(error);
          toast.error("Failed to save order");
        }
      },
      modal: {
        ondismiss: function() {
          toast.info("Payment cancelled");
        }
      },
      theme: {
        color: "#3399cc",
      }
    };

    try {
      var pay = new window.Razorpay(options);
      pay.open();
      console.log(pay);
    } catch (error) {
      console.error("Razorpay Error:", error);
      toast.error("Payment system not available");
    }
  }

  return (
    <Layout >
      <div className="min-h-screen bg-gray-100 pt-5 pb-10" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3 mb-6 md:mb-0">

            {cartItems.map((item, index) => {
              return (
                 <div key={index} className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt="product-image" 
                  className="w-full rounded-lg sm:w-40 h-40 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://dummyimage.com/400x400/cccccc/666666?text=No+Image';
                  }}
                />
              ) : (
                <div className="w-full sm:w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              )}
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title || 'Unknown Product'}</h2>
                  <h2 className="text-sm  text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description || 'No description'}</h2>
                  <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{item.price || '0'}</p>
                </div>
                <div onClick={() => deleteCart(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>

                </div>
              </div>
            </div>
              )
          })}
              
          </div>

          <div className="mt-6 h-fit rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 sticky top-5" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{grandTotal}</p>
              </div>
            </div>
            <Modal 
            name={name}
            address={address}
            pincode={pincode}
            phoneNumber={phoneNumber}
            setName={setName}
            setAddress={setAddress}
            setPincode={setPincode}
            setPhoneNumber={setPhoneNumber}
            buyNow={buyNow}
            />
            
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart