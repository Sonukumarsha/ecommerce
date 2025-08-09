import React, { useContext, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import myContext from "../../../context/data/myContext";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";


function DashboardTab() {
  const context = useContext(myContext);
  const { mode, product, edithandle, deleteProduct, order, user } = context;
  let [isOpen, setIsOpen] = useState(false);

  console.log("Dashboard - Products:", product);
  console.log("Dashboard - Orders:", order);


  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const goToAdd = () => {
    window.location.href = "/addproduct";
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="tab container mx-auto ">
          <Tabs defaultIndex={0} className=" ">
            <TabList className="md:flex md:space-x-8 bg-  grid grid-cols-2 text-center gap-4   md:justify-center mb-10 ">
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-5 py-1.5 text-center bg-[#605d5d12] "
                >
                  <div className="flex gap-2 items-center">
                    <MdOutlineProductionQuantityLimits />
                    Products
                  </div>{" "}
                </button>
              </Tab>
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 border-pink-500 bg-[#605d5d12] text-pink-500  hover:shadow-pink-700  rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]    px-5 py-1.5 text-center "
                >
                  <div className="flex gap-2 items-center">
                    <AiFillShopping /> Order
                  </div>
                </button>
              </Tab>
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl  hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]   px-5 py-1.5 text-center "
                >
                  <div className="flex gap-2 items-center">
                    <FaUser /> Users
                  </div>
                </button>
              </Tab>
            </TabList>
            {/* product  */}
            <TabPanel>
              <div className="  px-4 md:px-0 mb-16">
                <h1
                  className=" text-center mb-5 text-3xl font-semibold underline"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Product Details
                </h1>
                <div className=" flex justify-end">
                  <button
                    onClick={goToAdd}
                    className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    {" "}
                    <div className="flex gap-2 items-center">
                      Add Product <FaCartPlus size={20} />
                    </div>
                  </button>
                </div>
                <div className="relative overflow-x-auto ">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
                    <thead
                      className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          S.No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {product && product.length > 0 ? (
                        product.map((item, index) => {
                          const {
                            title,
                            price,
                            imageUrl,
                            category,
                            description,
                            date,
                          } = item;
                          return (
                            <tr
                              key={index}
                              className="bg-gray-50 border-b dark:border-gray-700"
                              style={{
                                backgroundColor:
                                  mode === "dark" ? "rgb(46 49 55)" : "",
                                color: mode === "dark" ? "white" : "",
                              }}
                            >
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {item.paymentId}
                              </td>
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-black whitespace-nowrap"
                              >
                                <img
                                  className="w-16"
                                  src={imageUrl || 'data:image/jpeg;base64,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'}
                                  alt="Product Image"
                                  onError={(e) => {
                                    e.target.src = 'data:image/jpeg;base64,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';
                                  }}
                                />
                              </th>
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {title}
                              </td>
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                ₹{price}
                              </td>
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {category}
                              </td>
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {date}
                              </td>
                              <td className="px-6 py-4">
                                <div className=" flex gap-2">
                                  <div
                                    className="cursor-pointer text-black"
                                    style={{
                                      color: mode === "dark" ? "white" : "",
                                    }}
                                  >
                                    <div
                                      onClick={() => deleteProduct(item)}
                                      title="Delete Product"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                      </svg>
                                    </div>

                                    <div>
                                      <Link to={`/updateproduct/${item.id}`}>
                                        <div onClick={() => edithandle(item)}>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                            />
                                          </svg>
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-6 py-4 text-center"
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            No products found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              {/* <Order order={order} setOrder={setOrder} setLoading={setLoading} /> */}
              <div className="relative overflow-x-auto mb-16">
                <h1
                  className=" text-center mb-5 text-3xl font-semibold underline"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Order Details
                </h1>
                {/* *** THE ONLY CORRECTION IS HERE *** */}
                {order && order.length > 0 ? (
                  order.map((allorder, index) => {
                    return (
                      <table
                        key={index}
                        className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-5"
                      >
                        <thead
                          className="text-xs text-black uppercase bg-gray-200 "
                          style={{
                            backgroundColor:
                              mode === "dark" ? "rgb(46 49 55)" : "",
                            color: mode === "dark" ? "white" : "",
                          }}
                        >
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Payment Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Pincode
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Phone Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                              {allorder.email}
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {allorder.cartItems &&
                            allorder.cartItems.map((item, Index) => {
                              //console.log(allorder);
                              const {title, description, imageUrl, price, category} = item;
                              return (
                                <tr
                                  key={Index}
                                  className="bg-gray-50 border-b dark:border-gray-700"
                                  style={{
                                    backgroundColor:
                                      mode === "dark" ? "rgb(46 49 55)" : "",
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  <td
                                    className="px-6 py-4 text-black "
                                    style={{
                                      color: mode === "dark" ? "white" : "",
                                    }}
                                  >
                                    {allorder.paymentId || "N/A"}
                                  </td>
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                                  >
                                    <img
                                      className="w-16"
                                      src={
                                        item.imageUrl ||
                                        "https://dummyimage.com/720x400"
                                      }
                                      alt="img"
                                    />
                                  </th>
                                  <td
                                    className="px-6 py-4 text-black "
                                    style={{
                                      color: mode === "dark" ? "white" : "",
                                    }}
                                  >
                                    {item.title || "N/A"}
                                  </td>
                                  <td
                                    className="px-6 py-4 text-black "
                                    style={{
                                      color: mode === "dark" ? "white" : "",
                                    }}
                                  >
                                    ₹{item.price || "0"}
                                  </td>
                                  <td
                                    className="px-6 py-4 text-black "
                                    style={{
                                      color: mode === "dark" ? "white" : "",
                                    }}
                                  >
                                    {item.category || "N/A"}
                                  </td>
                                  <td
                                    className="px-6 py-4 text-black "
                                    style={{
                                      color: mode === "dark" ? "white" : "",
                                    }}
                                  >
                                    {allorder.addressInfo?.name || "N/A"}
                                  </td>
                                  <td
                                    className="px-6 py-4 text-black "
                                    style={{
                                      color: mode === "dark" ? "white" : "",
                                    }}
                                  >
                                    {allorder.addressInfo?.address || "N/A"}
                                  </td>
                                  <td
                                    className="px-6 py-4 text-black "
                                    style={{
                                      color: mode === "dark" ? "white" : "",
                                    }}
                                  >
                                    {allorder.addressInfo?.pincode || "N/A"}
                                  </td>
                                  <td
                                    className="px-6 py-4 text-black "
                                    style={{
                                      color: mode === "dark" ? "white" : "",
                                    }}
                                  >
                                    {allorder.addressInfo?.phoneNumber || "N/A"}
                                  </td>
                                  <td
                                    className="px-6 py-4 text-black "
                                    style={{
                                      color: mode === "dark" ? "white" : "",
                                    }}
                                  >
                                    {allorder.email || "N/A"}
                                  </td>
                                  <td
                                    className="px-6 py-4 text-black "
                                    style={{
                                      color: mode === "dark" ? "white" : "",
                                    }}
                                  >
                                    {allorder.date || "N/A"}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    );
                  })
                ) : (
                  <div className="text-center py-10">
                    <p
                      className="text-gray-500"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      No orders found
                    </p>
                  </div>
                )}
                {/* *** END OF CORRECTION *** */}
              </div>
            </TabPanel>
            <TabPanel>
              {/* <User addressInfo={addressInfo} setAddressInfo={setAddressInfo} setLoading={setLoading} /> */}
              <div className="relative overflow-x-auto mb-10">
                <h1
                  className=" text-center mb-5 text-3xl font-semibold underline"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  User Details
                </h1>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead
                    className="text-xs text-black uppercase bg-gray-200 "
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S.No
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Address
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Pincode
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Phone Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                    </tr>
                  </thead>
                {user && Array.isArray(user) ? user.map((item, index)=>{
                  const {name, uid, email, data} = item;
                  return(
                     <tbody>
                    <tr
                      className="bg-gray-50 border-b  dark:border-gray-700"
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <td
                        className="px-6 py-4 text-black "
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {index + 1}
                      </td>
                      <td
                        className="px-6 py-4 text-black "
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        Name
                      </td>
                      <td
                        className="px-6 py-4 text-black "
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        Address
                      </td>
                      <td
                        className="px-6 py-4 text-black "
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        181919
                      </td>
                      <td
                        className="px-6 py-4 text-black "
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        1991818818
                      </td>
                      <td
                        className="px-6 py-4 text-black "
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        kkk@gmail.com
                      </td>
                      <td
                        className="px-6 py-4 text-black "
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        12 Aug 2019
                      </td>
                    </tr>
                  </tbody>
                  )
                }) : <tbody><tr><td colSpan="4" className="text-center py-4">No users found</td></tr></tbody>}
                </table>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default DashboardTab;