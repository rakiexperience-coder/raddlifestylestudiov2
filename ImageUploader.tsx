import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imagePreview: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imagePreview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onImageUpload(file);
  };

  return (
    <div
      className="relative w-full h-80 border-2 border-dashed border-raddGold/30 rounded-2xl bg-white 
                 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 
                 hover:border-raddGold hover:bg-ivory hover:shadow-[0_10px_30px_-10px_rgba(164,130,63,0.15)] 
                 group overflow-hidden"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {/* Gold gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-raddGold/10 to-transparent opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {imagePreview ? (
        <>
          <img
            src={imagePreview}
            alt="Preview"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          />
          {/* Overlay for Change Photo */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
            <button
              className="bg-white/95 text-raddGold px-6 py-2.5 rounded-full font-medium text-sm tracking-wide shadow-lg
                         transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
            >
              Change Photo
            </button>
          </div>
        </>
      ) : (
        <div className="relative z-10 flex flex-col items-center pointer-events-none">
          <div className="p-5 rounded-full bg-ivory shadow-sm border border-gray-100 text-raddGold mb-5 
                          group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-light text-softCharcoal tracking-wide mb-2">
            Upload Reference Photo
          </h3>
          <p className="text-xs text-softCharcoal/50 uppercase tracking-widest 
                         group-hover:text-raddGold transition-colors">
            Drag & drop or click to browse
          </p>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default ImageUploader;