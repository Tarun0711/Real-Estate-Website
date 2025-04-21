import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { getAllProperties } from '../../../Services/Operations/PropertyServices';
import { getAllSocieties } from '../../../Services/Operations/SocietyServices';

// const projects = [
//   {
//     tag: "NEW LAUNCH",
//     name: "DSR The Courtyard",
//     location: "Sarjapur Road, Bangalore",
//     price: "₹ 94.59 L - 1.52 Cr",
//     type: "2, 3 BHK Apartments",
//     priceIncrease: "5.4% price increase in last 3 months in ...",
//     image: "https://newprojects.99acres.com/projects/serene_estates/serene_nsl_nakshatra/images/0f9p7rb_1723622725_511900669_med.jpg"
//   },
//   {
//     tag: "NEW ARRIVAL",
//     name: "DSR Elixir",
//     location: "Whitefield, Bangalore",
//     price: "₹ 2.34 - 4.72 Cr",
//     type: "4, 5 BHK Villa",
//     priceIncrease: "14.8% price increase in last 3 months i...",
//     image: "https://newprojects.99acres.com/projects/kalpana_struct-con/kalpana_the_olympia/images/pt2eur5_1720854104_504336331_med.jpg"
//   },
//   {
//     tag: "NEW LAUNCH",
//     name: "Trifecta Vanto",
//     location: "Sarjapur Road, Bangalore",
//     price: "₹ 1.02 - 1.34 Cr",
//     type: "2, 3 BHK Apartments",
//     priceIncrease: "5.4% price increase in last 3 months in ...",
//     image: "https://newprojects.99acres.com/projects/raamah_lifespace/raamah_ellemento/images/hmbtg06_1717240937_495724244_med.jpg"
//   },
//   {
//     tag: "NEW LAUNCH",
//     name: "Godrej Splendour",
//     location: "Whitefield, Bangalore",
//     price: "₹ 72.00 L - 1.26 Cr",
//     type: "1, 2, 3 BHK Apartments",
//     priceIncrease: "7.2% price increase in last 3 months in ...",
//     image: "https://newprojects.99acres.com/projects/concorde/concorde_mayfair/images/fmd7uj2_1727938313_522221791_med.jpg"
//   },
//   {
//     tag: "NEW ARRIVAL",
//     name: "Prestige City",
//     location: "Sarjapur Road, Bangalore",
//     price: "₹ 28.17 L - 1.37 Cr",
//     type: "1, 2, 3 BHK Apartments",
//     priceIncrease: "10.1% price increase in last 3 months i...",
//     image: "https://newprojects.99acres.com/projects/sumadhura_group/sumadhura_sarang/images/ephnrvf_1699512988_455609420_med.jpg"
//   },
//   {
//     tag: "NEW ARRIVAL",
//     name: "DSR Elixir",
//     location: "Whitefield, Bangalore",
//     price: "₹ 2.34 - 4.72 Cr",
//     type: "4, 5 BHK Villa",
//     priceIncrease: "14.8% price increase in last 3 months i...",
//     image: "https://newprojects.99acres.com/projects/vaishno_builders/vaishno_serene/images/a84s1by_1716986145_495093674_med.jpg"
//   },
// ];

const details = [
  { text: "Bigger home in the same budget" },
  { text: "Less upfront payment" },
  { text: "Attractive payment plans" }
];

const NewlyLaunchedProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDetail, setCurrentDetail] = useState(0);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
    const response = await getAllSocieties();
    const readyToMoveProjects = response.data.filter(project => project.status === "Ready to Move");
    setProjects(readyToMoveProjects);
    };
    fetchProjects();
  }, []);
  



  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDetail((prevDetail) => (prevDetail + 1) % details.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3 >= projects.length ? 0 : prevIndex + 3));
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 < 0 ? Math.max(projects.length - 3, 0) : prevIndex - 3));
  };

  return (
    <div className="h-[20rem] mb-32 bg-blue-100 mx-auto w-3/4 px-6 md:p-6 rounded-lg">

    {/* <div className="  h-[28rem] mt-20  bg-blue-100 mx-auto w-3/4 px-60 ml-10 md:p-6 rounded-lg"> */}
      <div className="flex items-center mb-2">
        {/* <span className="text-blue-600 text-3xl mr-2">
          
        </span> */}
        <span className="text-blue-600 text-3xl mr-2">
           <img src="https://static.99acres.com/universalapp/img/USP.png" alt="USP" className="inline-block w-12 h-12" />
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-navy-900">Newly Launched Projects</h2>
      </div>
      <p className="text-gray-600 ml-14 -mt-3 text-sm md:text-base mb-4 animate-slide-left">{details[currentDetail].text}</p>
      <div className="flex items-center">
        <button onClick={prevProject} className="p-2 bg-white rounded-full shadow-md mr-2 md:mr-4 flex-shrink-0">
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
        </button>
        <div className="flex space-x-2 px-7 w-full overflow-hidden">
          {projects.slice(currentIndex, currentIndex + 3).map((project, index) => (
            <div
              key={index}
              className="bg-white p-3 md:p-4 mb-4 rounded-lg shadow-md transition-all duration-300 flex-shrink-0 w-full sm:w-1/2 md:w-1/3"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                  {new Date(project.createdAt).getFullYear()}
                </div>
                <img src={`http://localhost:9002/upload/${project.images[0]}`} alt={project.name} className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover" />
              </div>

              <h3 className="font-semibold text-sm md:text-lg mb-1">{project.name}</h3>
              <p className="text-gray-600 text-xs md:text-sm mb-1">{project.location},{project.city},{project.state}</p>
              <p className="font-bold text-sm md:text-base mb-1">₹ {project.priceRange}</p>
              <p className="text-xs md:text-sm text-gray-700 mb-1">{project.bhkTypes.map((item,index)=>(
                <span key={index}>{item}, </span>
              ))}</p>
              {/* <p className="text-xs text-green-600">{project.priceIncrease}</p> */}
              <div className="flex items-center mt-2 md:mt-4">
                <span className="text-blue-600 text-xs md:text-sm mr-2">Get preferred options</span>
                <span className="text-gray-600 text-xs">@zero brokerage</span>
              </div>
              <button className="mt-2 md:mt-4 w-full bg-blue-600 text-white py-1 md:py-2 rounded-lg text-sm md:text-base hover:bg-blue-700 transition-colors">
                View Number
              </button>
            </div>
          ))}
        </div>
        <button onClick={nextProject} className="p-2 bg-white rounded-full shadow-md ml-2 md:ml-4 flex-shrink-0">
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default NewlyLaunchedProjects;

