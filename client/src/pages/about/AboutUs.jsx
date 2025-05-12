import React, { useEffect } from 'react';
import ProfileImg from './profile.jpg.jpg';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import axios from 'axios';



const AboutUs = () => {

  useEffect(() => {
    // AboutUs Page visit tracking API call
    axios.post('/api/track/aboutus', { page: 'AboutUs' })
      .then(res => console.log("Hey Amigo! Visiting tracked successfully"))
      .catch(err => console.error("Sorry Amigo! Failed to track visit", err));
  }, []);

  return (
    <div>
      
      <div className='flex justify-center'>
        <Link className="mb-8 md:mb-12" to='/'>
        <img className="w-24 md:w-32 mt-4" src={assets.logo} alt="logo" />
    </Link>
      </div>
      

      <div className="flex flex-col items-center justify-center p-6 md:p-5 w-full bg-primary text-white mt-8">
    
    <div className="flex flex-col items-center">
        <p className="md:text-3xl text-xl text-center uppercase">This is Our First Online Groccery Delivary App. Instant commerce indistinguishable from magic</p>

        <div className='flex flex-col items-center mt-4'>
           <p className='md:text-2xl text-sm text-center'>
                At BoseCart, we make grocery shopping simple, fast, and fresh. Our mission is to deliver high-quality groceries—from farm-fresh fruits to daily essentials—right to your doorstep. We source from trusted suppliers, ensure timely delivery, and offer competitive prices so you can shop with confidence. Built with care by a passionate team, BoseCart is committed to providing a smooth and eco-friendly online shopping experience. Whether you're a busy professional or a home cook, we're here to make your life easier—one delivery at a time.
            </p> 
            <p className='md:text-2xl tex-sm text-center mt-2 uppercase'>Fresh groceries. Delivered with care. 👍</p>
        </div>
        
        <div className="flex items-center gap-2 mt-8">
            <a href="https://www.linkedin.com/in/srimanta-bose-753375250/">
                <img className="w-30 h-30 md:w-50 md:h-50 rounded-full" src={ProfileImg} alt="profile" />
                </a>
            <div className="text-sm">
                <p className="font-medium text-lg">Srimanta Bose</p>
                <p>Developer of this Website</p>
                <p> 👈 Cilck on this Profile Picture to Connect Srimanta on Linkedin</p>
            </div>
        </div>
    </div>
    
</div>

    </div>
  )
}

export default AboutUs
