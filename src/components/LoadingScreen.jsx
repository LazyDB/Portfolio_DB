export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="orbit-loader">
        <div className="orbit-ring"></div>
        <span className="orbit-dot"></span>
        <span className="orbit-center"></span>
      </div>

      <div className="loader-text">
        <span>Loading Portfolio</span>

        <div className="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}