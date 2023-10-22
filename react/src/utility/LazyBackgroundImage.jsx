import React, { useState } from "react";

function LazyBackgroundImage({ img, children, className, style }) {
  const [loaded, setLoaded] = useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };
  return (
    <div
      style={{
        backgroundImage: `url("${img}")`,
        filter: loaded ? "none" : "blur(20px)",
        transition: "filter 0.5s",
        ...style,
      }}
      className={className}
    >
      <img
        src={img}
        alt=""
        onLoad={handleLoad}
        style={{ display: "none" }}
        loading="lazy"
      />
      {loaded && children}
    </div>
  );
}

export default LazyBackgroundImage;
