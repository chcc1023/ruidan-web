import React from 'react';
import Image from 'next/image';

export interface PartnerCardProps {
  name: string;
  logo?: string;
  logoLetter?: string;
  tags: string[];
  isOfficial: boolean;
}

export default function PartnerCard({ name, logo, logoLetter, tags, isOfficial }: PartnerCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="p-6">
        {/* Logo或名称首字母 */}
        {logo ? (
          <div className="h-16 w-full flex items-center justify-center mb-4">
            <Image 
              src={logo} 
              alt={name} 
              width={160} 
              height={64} 
              className="h-16 w-auto object-contain" 
            />
          </div>
        ) : (
          <div className="h-16 w-full flex items-center justify-center mb-4 bg-blue-50 rounded-lg">
            <span className="text-xl font-bold text-blue-600">{logoLetter || name.charAt(0)}</span>
          </div>
        )}

        {/* 名称 */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{name}</h3>
        
        {/* 标签 */}
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 官方认证标记 */}
        {isOfficial && (
          <div className="flex items-center justify-center text-xs text-green-600 font-medium">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            官方合作伙伴
          </div>
        )}
      </div>
    </div>
  );
} 