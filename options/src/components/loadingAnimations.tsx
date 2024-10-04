const LoadingBars = ({ size = 35, color = 'black', speed = 1, stroke = 3.5 }) => {
  const containerStyle = {
    '--uib-size': `${size}px`,
    '--uib-color': color,
    '--uib-speed': `${speed}s`,
    '--uib-stroke': `${stroke}px`,
  };

  const barAnimation = `grow ${speed}s ease-in-out infinite`;

  return (
    <div
      className="flex items-center justify-between"
      style={{
        ...containerStyle,
        width: 'var(--uib-size)',
        height: 'calc(var(--uib-size) * 0.9)',
      }}
    >
      {[0.45, 0.3, 0.15, 0].map((delay, index) => (
        <div
          key={index}
          className="bg-current transition-colors duration-300 ease-in-out"
          style={{
            width: 'var(--uib-stroke)',
            height: '100%',
            animation: barAnimation,
            animationDelay: `calc(var(--uib-speed) * -${delay})`,
          }}
        ></div>
      ))}

      <style>{`
        @keyframes grow {
          0%,
          100% {
            transform: scaleY(0.3);
          }
          50% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingBars;
