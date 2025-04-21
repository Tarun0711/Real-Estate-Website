import React, { useState, useEffect } from "react";
import subscribe from "../../assets/subscribe.svg";
const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open modal after 1 minute (60000ms)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 20000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex md:flex-row flex-col items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white relative rounded-lg flex md:flex-row flex-col items-center justify-between p-8 max-w-fit w-full shadow-lg">
            <img
              src={subscribe}
              alt="Newsletter Illustration"
              className="w-1/2 mx-auto"
            />
            <div className="flex flex-col items-start md:space-y-4">
            <p className="text-gray-600  text-center">Stay up to date</p>
              <h2 className="md:text-xl font-bold text-gray-800">
                You’re probably thinking, “Another newsletter?”
                <br />
                But we promise, you’re going to love ours!
              </h2>
              <form className="flex mt-4 items-center space-x-2">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm absolute left-1/2 md:bottom-4 bottom-2 text-gray-500 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsletterModal;
