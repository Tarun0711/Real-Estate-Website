// import { Button } from "./ui/button"

// export default function HowToPostProperty() {
//     const details = [{
//       image: "https://static.99acres.com/universalapp/img/USP.png",
//       number: "01",
//       title: "Add details of your property",
//       description: "Begin by telling us the few basic details about your property like your property type, location,No. of rooms etc"
//     }, {
//       image: "https://www.99acres.com/universalapp/img/AboutMyProperty2.png",
//       number: "02",
//       title: "Upload Photos & Video",
//       description: "Upload photos and videos of your property either via your desktop device or from your mobile phone"
//     }, {
//       image: "https://www.99acres.com/universalapp/img/TransactionPrices2.png",
//       number: "03",
//       title: "Add Pricing & Ownership",
//       description: "Just update your property's ownership details and your expected price and your property is ready for posting"
//     }]
  
//     return (
//       <div className="max-w-full pt-10  mx-auto px-4 py-16">
//         <div className="text-center ">
//           <p className="text-gray-400 text-sm uppercase font-extrabold tracking-wider mb-2">
//             HOW TO POST
//           </p>
//           <h2 className="text-5xl font-extrabold text-black">
//             Post Your Property in
//           </h2>
//           <h2 className="text-5xl pt-2 font-extrabold text-black">
//             3 Simple Steps
//           </h2>
//         </div>
  
//         <div className="grid md:grid-cols-3 pt-16 mb-52 gap-8">
//           {details.map((item, index) => (
//             <div key={index} className="text-center">
//               <div className="flex justify-center mb-6">
//                 <img 
//                   src={item.image} 
//                   alt="" 
//                   className="w-16 h-16 object-contain"
//                 />
//               </div>
//               <div className="space-y-3 ">
//                 <h3 className="flex items-center justify-center gap-2">
//                   <span className="text-[#0078db] font-medium">
//                     {item.number}.
//                   </span>
//                   <span className="text-black font-semibold text-lg">
//                     {item.title}
//                   </span>
//                 </h3>
//                 <p className="text-gray-500  text-sm leading-relaxed">
//                   {item.description}
//                 </p>
//               </div>

              
              
              
//             </div>
            
//           ))}

//         <div className="mt-4    md:mt-8">
//           <a
//             href="#"
//             className="inline-block rounded  bg-[#006ac2] px-8  text-lg font-bold text-white transition focus:outline-none p-3 focus:ring focus:ring-yellow-400"
//           >
//            Explore PG/Co-living
//           </a>
//         </div>



          
//         </div>
        
        
//       </div>
//     )
// }
  
  

export default function HowToPostProperty() {
    const details = [{
      image: "https://static.99acres.com/universalapp/img/USP.png",
      number: "01",
      title: "Add details of your property",
      description: "Begin by telling us the few basic details about your property like your property type, location, No. of rooms etc"
    }, {
      image: "https://www.99acres.com/universalapp/img/AboutMyProperty2.png",
      number: "02",
      title: "Upload Photos & Video",
      description: "Upload photos and videos of your property either via your desktop device or from your mobile phone"
    }, {
      image: "https://www.99acres.com/universalapp/img/TransactionPrices2.png",
      number: "03",
      title: "Add Pricing & Ownership",
      description: "Just update your property's ownership details and your expected price and your property is ready for posting"
    }]
  
    return (
      <div className="max-w-full pt-10 mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-gray-400 text-sm uppercase font-extrabold tracking-wider mb-2">
            HOW TO POST
          </p>
          <h2 className="text-5xl font-extrabold text-black">
            Post Your Property in
          </h2>
          <h2 className="text-5xl pt-2 font-extrabold text-black">
            3 Simple Steps
          </h2>
        </div>
  
        <div className="grid md:grid-cols-3 pt-16 gap-8">
          {details.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-6">
                <img 
                  src={item.image} 
                  alt="" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="space-y-3">
                <h3 className="flex items-center justify-center gap-2">
                  <span className="text-[#0078db] font-medium">
                    {item.number}.
                  </span>
                  <span className="text-black font-semibold text-lg">
                    {item.title} 
                  </span>
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Centering the button */}
        <div className="flex justify-center items-center mt-16">
          <a
            href="#"
            className="inline-block rounded hover:bg-[#3399e6] bg-[#006ac2] px-8 text-lg font-bold text-white transition focus:outline-none p-3 focus:ring focus:ring-yellow-400"
          >
            Begin to Post Your Property
          </a>
        </div>
      </div>
    )
}

