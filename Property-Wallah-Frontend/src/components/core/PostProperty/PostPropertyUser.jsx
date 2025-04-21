import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { incrementStep, saveFormData, resetForm } from '../../../Redux/FormDataSlice.js';
import HowToPostProperty from './HowToPostProperty';

export default function PostPropertyUser() {
    const [propertyType, setPropertyType] = useState('Sell');
    const [category, setCategory] = useState('Residential');
    const [subCategory, setSubCategory] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleStartNow = () => {
        if (!propertyType || !category || !subCategory) {
            setError('Please select the type of property you wish to advertise.');
            return;
        }
        setError('');
        dispatch(saveFormData({ propertyType, category, subCategory }));
        dispatch(incrementStep());
    };

    const handleCancel = () => {
        dispatch(resetForm());
    };

    const subCategories = {
        Residential: [
            'Flat/Apartment',
            'Independent House / Villa',
            'Independent/Builder Floor',
            'Plot/Land',
            '1 RK/Studio Apartment',
            'Serviced Apartment',
            'Farmhouse'
        ],
        Commercial: [
            'Office',
            'Retail',
            'Plot/Land',
            'Storage',
            'Industry',
            'Hospitality'
        ]
    };

    return (
        <div>
            <div className='flex bg-[#fbfdff] flex-col md:flex-row items-center justify-between max-w-7xl pt-32 mx-auto p-6 gap-8 '>
                {/* Left section */}
                <div className="w-full md:w-1/2 space-y-6">
                    <h1 className='text-3xl md:text-4xl font-extrabold text-[#0a1e42]'>
                        Sell or Rent your Property
                        <div>
                            <span className='text-[#0078db]'>online faster</span> with Property Wallah
                        </div>
                    </h1>
                    <ul className="space-y-4">
                        {/* Features */}
                        {[
                            'Advertise for FREE',
                            'Get unlimited enquiries',
                            'Get shortlisted buyers and tenants *',
                            'Assistance in co-ordinating site visits *'
                        ].map((feature, index) => (
                            <li key={index} className='flex items-center gap-2'>
                                <svg className='w-5 h-5 text-green-500' viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className='font-extrabold'>{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-center md:w-[800px]">
                        <img src="https://static.99acres.com/universalapp/img/Desktop_Animation_compress.gif" alt="Property listing illustration" className="w-full max-w-md" />
                    </div> 
                </div>

                {/* Right section */}
                <div className="w-full md:w-[450px] bg-white rounded-lg shadow-lg p-6">
                    <div className='space-y-6'>
                        <h2 className="text-xl font-semibold text-[#0a1e42]">
                            Start posting your property, <span className='text-[#0078db] font-extrabold'>it's free</span>
                        </h2>
                        <div className='space-y-4'>
                            <p className="text-sm text-[#2e395c] font-extrabold">Add Basic Details</p>
                            <div>
                                <p className="text-sm text-[#0a1e42] mb-2 font-extrabold">You're looking to ...</p>
                                <div className='flex mt-3 gap-2'>
                                    {['Sell', 'Rent / Lease', 'PG'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setPropertyType(type)}
                                            className={`px-4 py-2 rounded-full text-sm ${
                                                propertyType === type
                                                    ? 'bg-blue-600 text-white font-extrabold'
                                                    : 'bg-[#e6f5fe] text-black'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-[#0a1e42] font-extrabold mb-2">And it's a ...</p>
                                <div className='flex gap-4'>
                                    {['Residential', 'Commercial'].map((type) => (
                                        <label key={type} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={category === type}
                                                onChange={() => setCategory(type)}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <span className="text-sm font-extrabold text-gray-600">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-[#0a1e42] font-extrabold mb-2">Select a Sub-Category</p>
                                <div className='flex flex-wrap gap-2'>
                                    {subCategories[category].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setSubCategory(type)}
                                            className={`px-4 py-2 rounded-full ${
                                                subCategory === type
                                                    ? 'bg-blue-600 text-white font-extrabold'
                                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm font-extrabold">{error}</p>}
                        <button
                            className="w-full font-extrabold py-4 bg-[#2678b3] text-white rounded-md hover:bg-[#006ac2] transition-colors"
                            onClick={handleStartNow}
                        >
                            Start now
                        </button>
                        <button
                            className="w-full font-extrabold py-4 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <HowToPostProperty />
            </div>
        </div>
    );
}
