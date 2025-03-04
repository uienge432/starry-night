import React from "react";
const { useState, useEffect } = React;

const StarryNight = () => {
  // Generate random positions for stars
  const generateStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        id: i,
        x: Math.random() * 100, // percentage across screen
        y: Math.random() * 100, // percentage down screen
        size: 1 + Math.random() * 2,
      });
    }
    // Sort stars by x position (left to right)
    return stars.sort((a, b) => a.x - b.x);
  };

  const [stars] = useState(() => generateStars(50));
  const [selectedStarIndex, setSelectedStarIndex] = useState(0);

  // Handle keyboard navigation with looping
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setSelectedStarIndex((prevIndex) =>
          prevIndex < stars.length - 1 ? prevIndex + 1 : 0
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedStarIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : stars.length - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [stars.length]);

  return (
    <div
      className="relative bg-black w-full h-screen overflow-hidden"
      tabIndex="0"
    >
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
        {/* Stars */}
        {stars
          .map((star, index) => {
            const isSelected = index === selectedStarIndex;
            const starSize = isSelected ? 4 : star.size;

            return (
              <div key={star.id} className="absolute">
                {/* The star */}
                <div
                  className="absolute bg-white rounded-full"
                  style={{
                    left: `0`,
                    top: `0`,
                    width: `${starSize}px`,
                    height: `${starSize}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                />

                {/* Bracket around selected star */}
                {isSelected && (
                  <>
                    {/* Left bracket [ */}
                    <div
                      className="absolute bg-white rounded-sm"
                      style={{
                        left: "-12px",
                        top: "0",
                        width: "2px",
                        height: "10px",
                        transform: "translateY(-50%)",
                      }}
                    />
                    <div
                      className="absolute bg-white rounded-sm"
                      style={{
                        left: "-12px",
                        top: "-5px",
                        width: "6px",
                        height: "2px",
                      }}
                    />
                    <div
                      className="absolute bg-white rounded-sm"
                      style={{
                        left: "-12px",
                        top: "5px",
                        width: "6px",
                        height: "2px",
                      }}
                    />

                    {/* Right bracket ] */}
                    <div
                      className="absolute bg-white rounded-sm"
                      style={{
                        left: "10px",
                        top: "0",
                        width: "2px",
                        height: "10px",
                        transform: "translateY(-50%)",
                      }}
                    />
                    <div
                      className="absolute bg-white rounded-sm"
                      style={{
                        left: "6px",
                        top: "-5px",
                        width: "6px",
                        height: "2px",
                      }}
                    />
                    <div
                      className="absolute bg-white rounded-sm"
                      style={{
                        left: "6px",
                        top: "5px",
                        width: "6px",
                        height: "2px",
                      }}
                    />
                  </>
                )}
              </div>
            );
          })
          .map((starElement) => (
            <div
              key={starElement.key}
              className="absolute"
              style={{
                left: `${stars[parseInt(starElement.key)].x}%`,
                top: `${stars[parseInt(starElement.key)].y}%`,
              }}
            >
              {starElement}
            </div>
          ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-white">
        Use the left and right arrow keys to navigate between stars.
      </div>
    </div>
  );
};

export default StarryNight;
