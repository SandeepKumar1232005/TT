import React, { useState, useEffect, useRef } from 'react';

interface VehicleImageProps {
  vehicleId: string;
  vehicleName: string;
  imageUrl: string;
  className?: string;
  category?: string;
}

export default function VehicleImage({
  vehicleId,
  vehicleName,
  imageUrl,
  className = "w-full h-full object-cover",
  category = "Sedan"
}: VehicleImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoading(false);
    }
  }, [imageUrl]);

  return (
    <div className="relative w-full h-full bg-neutral-900 select-none flex items-center justify-center overflow-hidden rounded-2xl">
      {/* Loading Skeleton Indicator */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center z-20">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
            <span className="text-[10px] font-mono text-gold-light tracking-widest uppercase">Verifying Vehicle Photograph...</span>
          </div>
        </div>
      )}

      {/* Primary Real Photo Image */}
      {!hasError ? (
        <img
          ref={imgRef}
          src={imageUrl}
          alt={vehicleName}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          className={`${className} ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-700 ease-out`}
        />
      ) : (
        /* Minimalist text placeholder fallback as strictly required by user */
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-950 flex flex-col items-center justify-center p-6 text-center z-10">
          <p className="text-gold uppercase tracking-widest text-[10px] font-mono font-semibold mb-2">
            {vehicleName}
          </p>
          <p className="text-gray-400 font-sans text-xs font-light">
            Vehicle image coming soon
          </p>
          <div className="h-[1px] w-8 bg-gold/30 mt-3" />
        </div>
      )}
    </div>
  );
}

