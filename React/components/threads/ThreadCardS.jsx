import React from "react";
import PropTypes from "prop-types";
import * as threadsService from "../../services/threadsService";
import PostList from "../posts/PostList";
import Moment from "react-moment";

class ThreadCardS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      firstName: "",
      mi: "",
      lastName: "",
      avatarUrl: "",
      subject: "",
      dateCreated: "",
    };
  }
  componentDidMount() {
    threadsService.getById(this.state.id).then(this.onGetByIdSuccess);
  }
  onGetByIdSuccess = (data) => {
    const threadData = data.item;
    this.setState(() => {
      return {
        firstName: threadData.firstName,
        mi: threadData.mi,
        lastName: threadData.lastName,
        avatarUrl: threadData.avatarUrl,
        subject: threadData.subject,
        dateCreated: threadData.dateCreated,
      };
    });
  };

  onClickReturn = () => {
    this.props.history.push({
      pathname: `/threads`,
    });
  };

  render() {
    return (
      <div className="p-5">
        <div className="threads-content-wrapper">
          <div className="thread-card-s thread-shadow  card w-100">
            <div className="card-body row no-gutters">
              <h2 className="col text-left">
                <p>{this.state.subject}</p>
              </h2>
              <div className="col text-center ">
                <div className="text-muted">
                  <small className="mr-1">Started by</small>
                  {this.state.firstName +
                    " " +
                    this.state.mi +
                    " " +
                    this.state.lastName}
                  <p>
                    <small>
                      <Moment format="MMMM DD, YYYY">
                        {this.state.dateCreated}
                      </Moment>
                    </small>
                  </p>
                </div>
              </div>
              <div className="col text-right">
                <img
                  className="rounded-circle thumb128"
                  src={
                    this.state.avatarUrl ||
                    "https://sabio-training.s3-us-west-2.amazonaws.com/intern_02599708-3f27-4adc-a35b-be642fdede28GREEN-SMILE-00.png"
                  }
                  alt="avatar"
                />
              </div>
            </div>
            <PostList
              threadId={+this.state.id}
              currentUser={this.props.currentUser}
            />
          </div>
          <div>
            <button
              className="btn btn-primary"
              onClick={this.onClickReturn}
              onChange={this.onChange}
            >
              Return
            </button>
          </div>
        </div>
      </div>
    );
  }
}
ThreadCardS.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      userId: PropTypes.string,
    }),
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default ThreadCardS;
