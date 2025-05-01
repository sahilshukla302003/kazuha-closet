import React, { forwardRef } from "react";

type LazyVideoProps = {
  src: string;
  mode: "lazy" | "immediate";
  className?: string;
};

const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(
  ({ src, mode, className }, ref) => {
    return (
      <video
        ref={ref}
        className={className}
        muted
        loop
        autoPlay
        playsInline
        preload={mode === "lazy" ? "none" : "auto"}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
);

LazyVideo.displayName = "LazyVideo";
export default LazyVideo;
