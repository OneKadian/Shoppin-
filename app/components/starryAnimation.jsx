import { useEffect, useState } from "react";

const StarryAnimation = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Create initial stars
    const newStars = Array.from({ length: 200 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 0.5 + 0.5}s`,
      animationDelay: `${Math.random() * 2}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute w-[1px] h-[1px] bg-white rounded-full animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            boxShadow: "0px 0px 1px 1px rgba(255, 255, 255, 0.4)",
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

export default StarryAnimation;
