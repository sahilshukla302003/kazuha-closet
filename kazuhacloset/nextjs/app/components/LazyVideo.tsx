"use client";
import React, { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src: string; // Path to the video file
  alt: string; // Alt text for accessibility
};

const LazyVideo: React.FC<LazyVideoProps> = ({ src, alt }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null); // Ref to the video element
  const [isVisible, setIsVisible] = useState(false); // State to track video visibility

  useEffect(() => {
    // Set up the Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Mark video as visible
          observer.disconnect(); // Disconnect the observer after the video has loaded
        }
      },
      {
        threshold: 0.1, // Trigger visibility check when 10% of the video is in view
      }
    );

    if (videoRef.current) observer.observe(videoRef.current); // Start observing the video element

    return () => observer.disconnect(); // Cleanup observer on component unmount
  }, []);

  return (
    <video
      ref={videoRef} // Reference to the video element
      className="rounded-xl w-full h-[320px] object-cover mb-4 transition-all duration-500
                brightness-110 contrast-125 saturate-150 hover:brightness-125 hover:saturate-200"
      loop
      muted
      playsInline
      onMouseEnter={(e) => e.currentTarget.play()} // Play video on mouse enter
      onMouseLeave={(e) => {
        e.currentTarget.pause(); // Pause video on mouse leave
        e.currentTarget.currentTime = 0; // Reset video to the beginning
      }}
      {...(isVisible ? { src } : {})} // Set video src only if the video is visible
      poster="/placeholder.jpg" // Placeholder image while the video is loading
      alt={alt} // Alt text for accessibility
    />
  );
};

export default LazyVideo;
