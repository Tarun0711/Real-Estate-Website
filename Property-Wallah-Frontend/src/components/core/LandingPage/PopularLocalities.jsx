// import React from 'react'
// import { Card, CardContent } from "@/components/ui/card"

// const localities = [
//   { id: 1, name: 'Bandra West', city: 'Mumbai', properties: 1234 },
//   { id: 2, name: 'Indiranagar', city: 'Bangalore', properties: 987 },
//   { id: 3, name: 'Vasant Kunj', city: 'Delhi', properties: 1543 },
//   { id: 4, name: 'Koregaon Park', city: 'Pune', properties: 765 },
//   { id: 5, name: 'Salt Lake City', city: 'Kolkata', properties: 654 },
//   { id: 6, name: 'Adyar', city: 'Chennai', properties: 876 },
// ]

// export default function PopularLocalities() {
//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Popular Localities</h2>
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {localities.map((locality) => (
//             <Card key={locality.id} className="hover:shadow-lg transition-shadow duration-300">
//               <CardContent className="p-6">
//                 <h3 className="text-xl font-semibold mb-2">{locality.name}</h3>
//                 <p className="text-gray-600 mb-2">{locality.city}</p>
//                 <p className="text-sm text-gray-500">{locality.properties} properties</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }



// import React from 'react'
// import { Card, CardContent } from "@/components/ui/card"

// const localities = [
//   { id: 1, name: 'Bandra West', city: 'Mumbai', properties: 1234, image: "https://newprojects.99acres.com/projects/serene_estates/serene_nsl_nakshatra/images/0f9p7rb_1723622725_511900669_med.jpg" },
//   { id: 2, name: 'Indiranagar', city: 'Bangalore', properties: 987, image: "https://newprojects.99acres.com/projects/kalpana_struct-con/kalpana_the_olympia/images/pt2eur5_1720854104_504336331_med.jpg" },
//   { id: 3, name: 'Vasant Kunj', city: 'Delhi', properties: 1543, image: "https://newprojects.99acres.com/projects/raamah_lifespace/raamah_ellemento/images/hmbtg06_1717240937_495724244_med.jpg" },
//   { id: 4, name: 'Koregaon Park', city: 'Pune', properties: 765, image: "https://newprojects.99acres.com/projects/concorde/concorde_mayfair/images/fmd7uj2_1727938313_522221791_med.jpg" },
//   { id: 5, name: 'Salt Lake City', city: 'Kolkata', properties: 654, image: "https://newprojects.99acres.com/projects/sumadhura_group/sumadhura_sarang/images/ephnrvf_1699512988_455609420_med.jpg" },
//   { id: 6, name: 'Adyar', city: 'Chennai', properties: 876, image: "https://newprojects.99acres.com/projects/dsr_infrastructure/dsr_elixir/images/pdbleqt_1720003493_502164911_med.jpg" },
// ]

// export default function PopularLocalities() {
//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Popular Localities</h2>
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {localities.map((locality) => (
//             <div
//               key={locality.id}
//               className="relative group overflow-hidden rounded-lg shadow-lg"
//               style={{
//                 backgroundImage: `url(${locality.image})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 height: "200px",
//               }}
//             >
//               {/* Dark overlay */}
//               <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60"></div>

//               {/* Content */}
//               <div className="relative z-10 flex flex-col justify-end h-full p-4 text-white">
//                 <h3 className="text-xl font-semibold mb-1">{locality.name}</h3>
//                 <p className="text-gray-200 mb-1">{locality.city}</p>
//                 <p className="text-sm text-gray-300">{locality.properties} properties</p>
//               </div>

//               {/* Zoom effect */}
//               <div
//                 className="absolute inset-0 transition-transform duration-300 transform group-hover:scale-110"
//                 style={{
//                   backgroundImage: `url(${locality.image})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                 }}
//               ></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


import React from 'react'

const localities = [
  { id: 1, name: 'Bandra West', city: 'Mumbai', properties: 1234, image: "https://newprojects.99acres.com/projects/serene_estates/serene_nsl_nakshatra/images/0f9p7rb_1723622725_511900669_med.jpg" },
  { id: 2, name: 'Indiranagar', city: 'Bangalore', properties: 987, image: "https://newprojects.99acres.com/projects/kalpana_struct-con/kalpana_the_olympia/images/pt2eur5_1720854104_504336331_med.jpg" },
  { id: 3, name: 'Vasant Kunj', city: 'Delhi', properties: 1543, image: "https://newprojects.99acres.com/projects/raamah_lifespace/raamah_ellemento/images/hmbtg06_1717240937_495724244_med.jpg" },
  { id: 4, name: 'Koregaon Park', city: 'Pune', properties: 765, image: "https://newprojects.99acres.com/projects/concorde/concorde_mayfair/images/fmd7uj2_1727938313_522221791_med.jpg" },
  { id: 5, name: 'Salt Lake City', city: 'Kolkata', properties: 654, image: "https://newprojects.99acres.com/projects/sumadhura_group/sumadhura_sarang/images/ephnrvf_1699512988_455609420_med.jpg" },
  { id: 6, name: 'Adyar', city: 'Chennai', properties: 876, image: "https://newprojects.99acres.com/projects/dsr_infrastructure/dsr_elixir/images/pdbleqt_1720003493_502164911_med.jpg" },
]

export default function PopularLocalities() {
  return (
    <section className="py-16 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Popular Localities</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {localities.map((locality) => (
            <div
              key={locality.id}
              className="relative group overflow-hidden rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${locality.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "200px",
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-25 transition-opacity duration-300 group-hover:bg-opacity-70"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-4 text-white">
                <h3 className="text-xl font-semibold mb-1">{locality.name}</h3>
                <p className="text-white opacity-90  mb-1">{locality.city}</p>
                <p className="text-sm text-gray-300">{locality.properties} properties</p>
              </div>

              {/* Zoom effect */}
              <div className="absolute inset-0 transition-transform duration-300 transform group-hover:scale-125"
                        style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${locality.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
              ></div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
