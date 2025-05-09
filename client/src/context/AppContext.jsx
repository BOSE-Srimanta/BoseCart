import React, { createContext, useContext, useEffect,  useState } from 'react';
import { useNavigate } from "react-router-dom";
import { dummyProducts } from '../assets/assets';
import toast from 'react-hot-toast';
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
console.log("This is a Base URL:", import.meta.env.VITE_BACKEND_URL);


export const AppContext = createContext();

export const AppContextProvider = ({children}) =>{

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    
    const [cartItems, setCartItems] = useState(()=> {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : {};
    });
    const [searchQuery, setSearchQuery] = useState({})

    //Fetch Seller Status
    const fetchSeller = async ()=>{
        try {
            const {data} = await axios.get('/api/seller/is-auth');
            if(data.success){
                setIsSeller(true)
        }else{
            setIsSeller(false)
        }
        } catch (error) {
            setIsSeller(false)
        }
    }
    
    //Fetch User Auth Status, User data Cart Items
     const fetchUser = async ()=>{
        try {
            const {data} = await axios.post('/api/user/is-auth')
            if(data.success){
                setUser(data.user)
                
                if (data.user.cartItems) {
                    setCartItems(data.user.cartItems) 
                }
            }
        } catch (error) {
            setUser(null)
        }
     }




    //Fetching all of the products
    const fetchProducts = async ()=>{
        try {
            const {data} = await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //added Product to the cart
    const addToCart = (itemId)=>{
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        localStorage.setItem("cartItems", JSON.stringify(cartData)); // Updated localStorage
        toast.success("Added to the cart")
    }

    //Update Cart of Item Quantity
    const updateCartItem = (itemId, quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("Cart is Updated")
    }
    
    //Removing Product from Cart
    const removeFromCart = (itemId)=>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId] === 0){
               delete cartData[itemId]; 
            }
        }
        toast.success("Removed from Cart")
        setCartItems(cartData)
    }


    //Get Cart Item Count
    const getCartCount = ()=>{
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        }
        return totalCount;
    }


//Get Cart Total Amount
const getCartAmount = ()=>{
    let totalAmount = 0;
    for (const itemId in cartItems){
        const itemsInfo = products.find((product)=> product._id === itemId);
        if(itemsInfo && cartItems[itemId] > 0){
            totalAmount += itemsInfo.offerPrice * cartItems[itemId];
        }
    }
    return Math.floor(totalAmount * 100)/100;
}


    useEffect(()=>{
        fetchUser()
        fetchSeller()
        fetchProducts()
    },[])

    //Update Database Cart Item

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);
    

    useEffect(()=>{
        const updateCart = async ()=>{
            try {
                console.log("cart Items", cartItems )
                const {data} = await axios.post('/api/cart/update', {cartItems})
                console.log("data is present", data)
                if(!data.success){
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        if(user){
            updateCart()
        }
    }, [cartItems])



    const value = {navigate, user, setUser, setIsSeller, isSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts, setCartItems }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}


export const useAppContext = ()=>{
    return useContext(AppContext)
}