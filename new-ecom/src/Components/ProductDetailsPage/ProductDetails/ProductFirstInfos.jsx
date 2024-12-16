import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

const ProductFirstInfos = ({ data }) => {
  const { name, price, description, rate = 4, votes = 120 } = data;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`h-5 w-5 ${index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 uppercase">
        {name}
      </h1>

      <div className="flex items-center space-x-4 mb-4 max-sm:flex-col max-sm:items-start max-sm:space-x-0 max-sm:space-y-2">
        <div className="flex items-center">
          {renderStars(rate)}
          <span className="text-gray-600 ml-2 text-sm">({votes} Reviews)</span>
        </div>
        
        <div className="h-5 border-r border-gray-300 mx-4 max-sm:hidden"></div>
        
        <div className="flex items-center text-green-600 font-semibold">
          <CheckCircle className="h-5 w-5 mr-1" />
          <span className="text-sm">In Stock</span>
        </div>
      </div>

      <div className="text-4xl font-bold text-black mb-4">
        ₹{price.toLocaleString()}
      </div>

      <p 
        className="text-gray-700 text-base leading-relaxed" 
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default ProductFirstInfos;