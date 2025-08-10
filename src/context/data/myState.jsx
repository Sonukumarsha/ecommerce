import React, { useState, useEffect, use } from 'react'
import myContext  from './myContext'  
import { collection, onSnapshot, query, Timestamp, orderBy, addDoc, setDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';





function myState (props) {
  const [mode, setMode] = useState('light');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isContextLoaded, setIsContextLoaded] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      localStorage.removeItem('user'); // Clear corrupted data
    } finally {
      setIsContextLoaded(true);
    }
  }, []);

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  const isAdmin = () => {
    if(user && user.user && user.user.email === "kumar@gmail.com"){
      return true;
    }
    return false;
  };


  const [Products, setProducts] = useState({
    title: '',
    price: '',
    imageUrl: '',
    category: '',
    description: '',
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
  })

  const addProduct = async () => {
    if (!Products.title || !Products.price || !Products.imageUrl || !Products.category || !Products.description){
      return  toast.error("all fields are required");
    }

    setLoading (true);

    try {
      const  productsRef = collection(fireDB, 'products');

      await addDoc(productsRef,Products);
      toast.success("Product added successfully");
      
      // Clear form after successful add
      setProducts({
        title: '',
        price: '',
        imageUrl: '',
        category: '',
        description: '',
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      });
      
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();
      setLoading(false);

    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
      setLoading(false);
    }

  };

  const addProducts = async () => {
  }

  const [product, setProduct] = useState ([]);

  const getProductData = async () => {
    setLoading(true);

    try {
      const q = query(
        collection(fireDB, 'products'),
        // orderBy('time')
      );

      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productArray);
        setLoading(false);
      }, (error) => {
        console.error("Error in products onSnapshot:", error);
        setLoading(false);
      });
      
      return unsubscribe;

    } catch (error) {
      console.log("Error fetching products:", error);
      setLoading(false);
    }
  }


  const edithandle = (item) => {
    console.log(item.time, item.date)
    setProducts({
      title: item.title || '',
      price: item.price || '',
      imageUrl: item.imageUrl || '',
      category: item.category || '',
      description: item.description || '',
      time: item.time, // Preserve original timestamp
      date: new Date(item.date).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })   // Preserve original date
    })
  }
  // update product function
   const updateProduct = async (id) => {
    setLoading(true)
    try {
      console.log(id)
      await setDoc(doc(fireDB, "products", id), Products);
      toast.success("Product Updated successfully")
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 800);
      getProductData();
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error("Failed to update product");
    }
  }


  const clearForm = () => {
    setProducts({
      title: '',
      price: '',
      imageUrl: '',
      category: '',
      description: '',
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    });
  };

  const deleteProduct = async (item) => {

    try {
      setLoading(true)
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product Deleted successfully')
      setLoading(false)
      getProductData()
    } catch (error) {
      // toast.success('Product Deleted Falied')
      setLoading(false)
    }
  }

  const [order, setOrder] = useState([]);
  const getOrderData = async () => {
    setLoading(true);

    try {
      const result = await getDocs(collection(fireDB, 'order'));
      const orderArray = [];
      result.forEach((doc) => {
        orderArray.push({ ...doc.data(), id: doc.id });
      });
      setOrder(orderArray);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const getUserData = async () => {
    setLoading(true);

    try {
      const result = await getDocs(collection(fireDB, 'user'));
      const userArray = [];
      result.forEach((doc) => {
        userArray.push({ ...doc.data(), id: doc.id });
      });
      setUser(userArray);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching users:", error);
      setLoading(false);
    }
  }

  // Single useEffect for initial data loading
  useEffect(() => {
    let unsubscribeProducts;
    
    const fetchAllData = async () => {
      // Fetch products with real-time listener
      unsubscribeProducts = await getProductData();
      
      // Fetch orders and users
      await getOrderData();
      await getUserData();
    };
    
    fetchAllData();

    // Cleanup function to unsubscribe from the listener
    return () => {
      if (unsubscribeProducts && typeof unsubscribeProducts === 'function') {
        unsubscribeProducts();
      }
    };
  }, []);


  const [users, setUsers] = useState([])

  const getUsersData = async () => {
    setLoading(true);

    try {
      const result = await getDocs(collection(fireDB, 'users'));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push({
          ...doc.data(),
          id: doc.id
        });
      });
      setUsers(usersArray); // Fixed: Now setting the users state instead of overwriting user state
      console.log("Fetched users:", usersArray);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching users:", error);
      setLoading(false);
    }
  }
useEffect(() => {
  getOrderData();
    getUsersData();
  }, []);


  return (
    <myContext.Provider value={{ 
      mode, 
      toggleMode, 
      loading, 
      setLoading, 
      user, 
      setUser, 
      logout, 
      isAdmin, 
      Products, 
      setProducts, 
      addProduct, 
      product, 
      edithandle, 
      updateProduct, 
      deleteProduct, 
      editingProductId, 
      clearForm, 
      order, 
      setOrder, 
      getUserData, 
      getOrderData, 
      isContextLoaded,
      users, // Added users to the context
      getUsersData // Added getUsersData function to the context
    }}
    >
      {props.children}
    </myContext.Provider>
  );

}

export default myState;