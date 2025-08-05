import React, { useContext, useEffect } from 'react'
import myContext from '../../../context/data/myContext'
import { useParams, useNavigate } from 'react-router-dom'

function UpdateProduct() {
    const context = useContext(myContext);
    const { Products, setProducts, updateProduct, product } = context;
    const { id } = useParams();
    const navigate = useNavigate();

    // Find and populate the form with existing product data
    useEffect(() => {
        if (product && id) {
            const productToUpdate = product.find(item => item.id === id);
            if (productToUpdate) {
                setProducts({
                    title: productToUpdate.title || '',
                    price: productToUpdate.price || '',
                    imageUrl: productToUpdate.imageUrl || '',
                    category: productToUpdate.category || '',
                    description: productToUpdate.description || ''
                });
            }
        }
    }, [id, product, setProducts]);

    return (
        <div>
            <div className=' flex justify-center items-center h-screen'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Product</h1>
                    </div>
                     <div>
                        <input type="text"
                            value={Products.title || ''}
                            onChange={(e) => setProducts({ ...Products, title: e.target.value })}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'
                        />
                    </div>
                    <div>
                        <input type="text"
                            value={Products.price || ''}
                            onChange={(e) => setProducts({ ...Products, price: e.target.value })}
                            name='price'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product price'
                        />
                    </div>
                    <div>
                        <input type="text"
                            value={Products.imageUrl || ''}
                            onChange={(e) => setProducts({ ...Products, imageUrl: e.target.value })}
                            name='imageurl'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product imageUrl'
                        />
                    </div>
                    <div>
                        <input type="text"
                            value={Products.category || ''}
                            onChange={(e) => setProducts({ ...Products, category: e.target.value })}
                            name='category'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product category'
                        />
                    </div>
                    <div>
                       <textarea cols="30" rows="10" name='description'
                           value={Products.description}
                           onChange={(e) => setProducts({ ...Products, description: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product description'>

                       </textarea>
                    </div>
                 
                  
                    <div className=' flex justify-center mb-3'>
                        <button
                            onClick={() => updateProduct(id)}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Update Product
                        </button>
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct