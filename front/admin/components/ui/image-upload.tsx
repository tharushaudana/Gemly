"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  maxImages?: number;
}

export function ImageUpload({
  className,
  value,
  onChange,
  disabled = false,
  maxImages = 5,
  ...props
}: ImageUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // For demo purposes, we're using URLs directly
  // In a real app, you would upload files to storage and get URLs back
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // For demo, we'll use placeholder images
    // In a real app, you would upload these files
    const placeholders = [
      "https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg",
      "https://images.pexels.com/photos/10417665/pexels-photo-10417665.jpeg",
      "https://images.pexels.com/photos/8891951/pexels-photo-8891951.jpeg",
      "https://images.pexels.com/photos/5442447/pexels-photo-5442447.jpeg",
    ];
    
    const newImages = Array.from(files).map((_, index) => {
      // Use a placeholder image from our list, or fall back to the first one
      return placeholders[index % placeholders.length];
    });
    
    if (value.length + newImages.length > maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }
    
    onChange([...value, ...newImages]);
    
    // Reset the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...value];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div
      className={cn(
        "flex flex-wrap gap-4",
        className
      )}
      {...props}
    >
      {value.map((imageUrl, index) => (
        <div 
          key={index} 
          className="relative w-24 h-24 border rounded-md overflow-hidden group"
        >
          <Image
            src={imageUrl}
            alt={`Uploaded image ${index + 1}`}
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => removeImage(index)}
            className="absolute top-1 right-1 bg-black/70 rounded-full p-1 
                       text-white opacity-0 group-hover:opacity-100 transition-opacity"
            disabled={disabled}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
      
      {value.length < maxImages && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "w-24 h-24 border-2 border-dashed rounded-md flex items-center justify-center text-muted-foreground",
            "hover:border-primary hover:text-primary transition-colors",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          disabled={disabled}
        >
          <ImagePlus className="h-6 w-6" />
          <span className="sr-only">Add image</span>
        </button>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="sr-only"
        disabled={disabled}
      />
    </div>
  );
}