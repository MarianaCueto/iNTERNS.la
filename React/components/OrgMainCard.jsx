import React from "react";
import PropTypes from "prop-types";
import "../organizations/Organization.css";

const OrgMainCard = (props) => {
  const editorg = () => {
    props.handleInfo(props);
  };

  let img =
    "https://amerikicklanghorne.com/wp-content/uploads/2017/04/default-image.jpg";

  if (props.org.logo && props.org.logo[0]) {
    img = props.org.logo;
  } else {
    img =
      "https://amerikicklanghorne.com/wp-content/uploads/2017/04/default-image.jpg";
  }

  return (
    <React.Fragment>
      <div className="col-lg-6 col-xl-4 p-3">
        <div onClick={editorg} type="button" className="card-box">
          <div className="mb-5 maincard">
            <img alt="img" className="card-img-top" src={props.org.logo} />
            <div className="card-body">
              <h3 className="card-title font-weight-bold font-size-lg text-center">
                {props.org.name}
              </h3>
              <p className="text-center">{props.org.headline}</p>
            </div>
            <button type="button" className="btn btn-edit ">
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

OrgMainCard.propTypes = {
  org: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    headline: PropTypes.string,
    logo: PropTypes.string,
  }),
  handleInfo: PropTypes.func,
};

export default React.memo(OrgMainCard);
