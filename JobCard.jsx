import React from "react";
import PropTypes from "prop-types";

const JobCard = (props) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <b>{props.job.title}</b>

          <div className="text-black-50"> {props.job.city}</div>
        </div>

        <div className="font-weight-bold text-danger font-size-xl">
          {props.job.jobType}
        </div>
      </div>
      <hr />
    </>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    title: PropTypes.string,
    city: PropTypes.string,
    jobType: PropTypes.string,
  }),
};

export default React.memo(JobCard);
