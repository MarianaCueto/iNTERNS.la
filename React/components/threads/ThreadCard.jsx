import React from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import "./Thread.css";
import Moment from "react-moment";

const ThreadCard = (props) => {
  const currentUser = props.currentUser;
  _logger(currentUser, "{{Props}}");

  const deleteThread = () => {
    props.handleDelete(props.thread.id);
  };
  const handleEditClick = (e) => {
    e.preventDefault();
    props.onEditClicked(props.thread);
  };
  const handleSelectClick = (e) => {
    e.preventDefault();
    props.onSelectClicked(props.thread);
  };
  const name =
    props.thread.firstName +
    " " +
    props.thread.mi +
    " " +
    props.thread.lastName;
  const canManage = (createdById) => {
    return props.currentUser.id === createdById;
  };
  if (props.thread.isActive === true) {
    return (
      <React.Fragment>
        <div className="thread-card thread-shadow  card w-100">
          <div className="card-body row no-gutters">
            <div className="col d-flex flex-wrap align-content-center">
              <div className="hover-zoom">
                <h4>{props.thread.subject}</h4>
              </div>
            </div>
            <div className="col-3 text-right">
              <div className="text-muted">
                <small className="mr-1">Started by</small>
                {name}
                <p>
                  <small>
                    <Moment format="MMMM DD, YYYY">
                      {props.thread.dateCreated}
                    </Moment>
                  </small>
                </p>
                {canManage(props.thread.createdBy) && (
                  <button
                    type="button"
                    className="mb-1 btn btn-thread button-edit"
                    onClick={handleEditClick}
                  >
                    <FaEdit />
                  </button>
                )}
                {canManage(props.thread.createdBy) && (
                  <button
                    type="button"
                    className="mb-1 btn btn-thread button-delete"
                    onClick={deleteThread}
                  >
                    <FaTrashAlt />
                  </button>
                )}
                <button
                  type="button"
                  className="mb-1 btn btn-thread button-info"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="More Details"
                  onClick={handleSelectClick}
                >
                  <FaInfoCircle />
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
};
ThreadCard.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    tenantId: PropTypes.string,
    avatarUrl: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }),
  thread: PropTypes.shape({
    id: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    firstName: PropTypes.string,
    mi: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
    dateCreated: PropTypes.string.isRequired,
  }),
  onDeleteClicked: PropTypes.func,
  onEditClicked: PropTypes.func,
  onSelectClicked: PropTypes.func,
};
export default React.memo(ThreadCard);
