import React from "react";

function Paths({ setPath }) {
  const ChangePath = (path) => {
    setPath(path);
  };
  return (
    <>
      <div className="cutting-paths">
        <div className="path" onClick={ () => ChangePath("full_package")}>
          Full Package
        </div>
        <div className="path" onClick={() =>  ChangePath("cutting_only")}>
          Cutting Only
        </div>
      </div>
    </>
  );
}

export default Paths;
