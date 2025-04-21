import { getAllSocieties } from '../../../Services/Operations/SocietyServices';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UpcomingProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllSocieties();
        const readyToMoveProjects = response.data.filter(
          (project) => project.status === 'Ready to Move'
        );
        setDetails(readyToMoveProjects);
      } catch (err) {
        setError('Failed to fetch projects.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (details.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % details.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [details]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + details.length) % details.length);
  };


  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % details.length);
  };

  if (loading) {
    return <div className="text-center mt-8 text-lg">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-lg text-red-500">{error}</div>;
  }

  if (details.length === 0) {
    return <div className="text-center mt-8 text-lg">No projects available</div>;
  }

  const { images = [], name, location, city,state,bhkTypes, priceRange } = details[currentIndex];
  const imageUrl = images.length > 0 ? `http://localhost:9002/upload/${images[0]}` : '';
  const handleViewDetails = () => {
    const project = details[currentIndex]; 
    navigate(`/project-details/${project.name}/${project._id}`, { state: { project } });
  };

  return (
    <div className="relative max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Project Image */}
      <div className="relative group overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-[500px] object-cover transform transition-transform duration-1000 group-hover:scale-125"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 p-8 flex flex-col ">
          <h2 className="text-white text-2xl font-bold">{name}</h2>
          <p className="text-white text-lg">{location},{city},{state}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-[#010c1f] text-white px-8 py-4 flex justify-between items-center">
        <div>
          <p className="text-lg">Available Flat <span>{bhkTypes}</span> </p>
          <p className="text-lg font-semibold">₹ {priceRange}</p>
        </div>
        <button onClick={handleViewDetails} className="bg-[#0078db] hover:bg-[#3399ff] md:px-12 py-3 rounded-lg flex items-center justify-center gap-2">
          <i className="fas fa-phone"></i>
          View Details
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-[#0078db] hover:text-white text-black w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-[#0078db] hover:text-white text-black w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
      >
        &gt;
      </button>
    </div>
  );
}

export default UpcomingProjects;
