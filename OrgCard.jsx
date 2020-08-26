import React from "react";
import PropTypes from "prop-types";

const OrgCard = (props) => {
  let img =
    "https://amerikicklanghorne.com/wp-content/uploads/2017/04/default-image.jpg";

  if (props.member.logo && props.member.logo) {
    img = props.member.logo;
  } else {
    img =
      "https://amerikicklanghorne.com/wp-content/uploads/2017/04/default-image.jpg";
  }

  return (
    <div className="rounded-circle p-3">
      <img alt="Follower" className="imgDashboard rounded-circle" src={img} />

      <div className="font-weight-bold mt-1 pb-2">{`${props.member.name}`}</div>
    </div>
  );
};

OrgCard.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string,
    lastName: PropTypes.string,
    logo: PropTypes.string,
  }),
};

export default React.memo(OrgCard);
