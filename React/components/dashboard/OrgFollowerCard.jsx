import React from "react";
import PropTypes from "prop-types";

const OrgFollowerCard = (props) => {
  let img =
    "https://amerikicklanghorne.com/wp-content/uploads/2017/04/default-image.jpg";

  if (props.follower.avatarUrl && props.follower.avatarUrl) {
    img = props.follower.avatarUrl;
  } else {
    img =
      "https://amerikicklanghorne.com/wp-content/uploads/2017/04/default-image.jpg";
  }

  return (
    <div className="rounded-circle p-3">
      <img alt="Follower" className="imgDashboard rounded-circle" src={img} />

      <div className="font-weight-bold mt-1">
        {`${props.follower.firstName} ${props.follower.lastName}`}
      </div>
    </div>
  );
};

OrgFollowerCard.propTypes = {
  follower: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
};

export default React.memo(OrgFollowerCard);
