import React, { useState } from 'react';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../hooks/useAuth';

export const ProductCard = ({
  id,
  title,
  description,
  price,
  originalPrice,
  imageUrl,
  affiliateUrl,
  retailer,
  category,
  onDetailsClick,
}) => {
  const { isWishlistItem, addItem, removeItem } = useWishlist();
  const { isLoggedIn } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(isWishlistItem(id));

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      alert('Please log in to add items to your wishlist');
      return;
    }

    if (isWishlisted) {
      await removeItem(id);
      setIsWishlisted(false);
    } else {
      await addItem(id);
      setIsWishlisted(true);
    }
  };

  const handleGetDeal = () => {
    if (affiliateUrl) {
      window.open(affiliateUrl, '_blank');
    }
  };

  const discountPercent =
    originalPrice && price ? Math.round(((originalPrice - price) / originalPrice) * 100) : null;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-40 bg-gray-200 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-gray-500">No Image</span>
          </div>
        )}

        {/* Discount Badge */}
        {discountPercent && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
            -{discountPercent}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 left-2 rounded-full p-2 transition ${
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Category Badge */}
        {category && (
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded mb-2 w-fit">
            {category}
          </span>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{title}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

        {/* Retailer */}
        {retailer && (
          <p className="text-xs text-gray-500 mb-3">
            <span className="font-semibold">Retailer:</span> {retailer}
          </p>
        )}

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-primary">${price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleGetDeal}
            className="flex-1 bg-primary hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-200 font-semibold"
          >
            Get Deal
          </button>
          {onDetailsClick && (
            <button
              onClick={() => onDetailsClick(id)}
              className="flex-1 border border-primary text-primary hover:bg-indigo-50 py-2 rounded-lg transition duration-200 font-semibold"
            >
              Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
