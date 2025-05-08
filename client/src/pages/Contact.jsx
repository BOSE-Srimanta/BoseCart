import React from "react";
import toast from "react-hot-toast";

const Contact = () => {

    //For Using Toast Message like Notification on Submit Button
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Srimanta Bose(Developer of this Website) will get back to you Shortly");
        e.target.reset(); //Clear the Form
      };

  return (

    <div>
       <form onSubmit={handleSubmit} className="flex flex-col items-center text-sm">
        
      <p className="text-lg text-primary font-medium pb-2">Contact Us</p>
      <h1 className="text-4xl font-semibold text-primary pb-4">Get in touch with us</h1>
      <p className="text-sm text-gray-500 text-center pb-10">
        Hey Mate! How You Doing? You are now Connect with Mr. Srimanta Bose. The Developer of This WebSite. You Ready Mate? Put your Name, Email, Contact Number to the boxes in below And tell me how can I help you? 🤩
      </p>

      <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
        <div className="w-full">
          <label className="text-black/70" htmlFor="name">
            Your Name
          </label>
          <input
            className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-primary"
            type="text" placeholder="Your Name Please"
            required
          />
        </div>

        <div className="w-full">
          <label className="text-black/70" htmlFor="name">
            Your Email
          </label>
          <input
            className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-primary"
            type="email" placeholder="Your email address"
            required
          />
        </div>

        <div className="w-full">
          <label className="text-black/70" htmlFor="name">
            Your Phone Number
          </label>
          <input
            className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-primary"
            type="text" placeholder="Your Contact Number Please"
            required
          />
        </div>

      </div>

      <div className="mt-6 w-[350px] md:w-[700px]">
        <label className="text-black/70" htmlFor="name">
          Message
        </label>
        <textarea
          className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-primary" placeholder="Write Your Thought Here.."
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="mt-5 bg-primary text-white h-12 w-56 px-4 rounded active:scale-95 transition cursor-pointer"
      >
        Send Your Valuable Thought 👍
      </button>
    </form>

    </div>
    
  );
};

export default Contact;