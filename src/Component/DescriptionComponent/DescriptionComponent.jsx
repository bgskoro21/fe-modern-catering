import React from "react";

const DescriptionComponent = ({ img, title, desc, aos, offset, delay }) => {
  return (
    <div className="col-md-3" data-aos={aos} data-aos-offset={offset} data-aos-delay={delay}>
      <img src={img} alt="" className="img-fluid w-100 mb-3" style={{ height: "180px" }} />
      <div className="body">
        <h5 className="mb-2 fs-4">{title}</h5>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default DescriptionComponent;
