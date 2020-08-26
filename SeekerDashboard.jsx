import React from "react";
import PropTypes from "prop-types";
import getById from "../../services/seekerDashboardService";
import Message from "../message/Message";
import InstantMessager from "../message/InstantMessager";

class SeekerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.currentUser.id,
      orgFollowedCount: 0,
      usersFollowed: 0,
      eventCount: 0,
      totalJobsCount: 0,
      jobsAppliedForCount: 0,
    };
  }

  componentDidMount() {
    getById(this.state.id)
      .then(this.onGetDashboardSuccess)
      .catch(this.handleDashboardError);
  }

  onGetDashboardSuccess = (response) => {
    const countData = response.item;
    this.setState((prevState) => {
      return {
        ...prevState,
        orgFollowedCount: countData.orgFollowedCount,
        usersFollowed: countData.usersFollowed,
        eventCount: countData.eventCount,
        totalJobsCount: countData.totalJobsCount,
        jobsAppliedForCount: countData.jobsAppliedForCount,
      };
    });
  };

  handleDashboardError = () => {
    _logger("Error in Seeker Dashboard");
  };

  handleOrganizationsClick = () => {
    _logger("organizations is firing");
    this.props.history.push("/organizations/orgsfollowed");
  };
  handleEventsClick = () => {
    _logger("events is firing");
    this.props.history.push("/events");
  };
  handleActiveJobsClick = () => {
    _logger("jobs is firing");
    this.props.history.push("/listings");
  };
  handleActiveJobApps = () => {
    _logger("current applications");
    this.props.history.push("/listings/applied");
  };
  handleUsersClick = () => {
    this.props.history.push("/seeker/seekersfollowed");
  };
  render() {
    return (
      <div>
        <div className="rag-fadeIn-enter-done">
          <div className="content-wrapper">
            <div className="row justify-content-center">
              <div className="col-md-6 col-xl-2">
                <div className="card flex-row bg-purple rounded-right align-items-center align-items-stretch border-0">
                  <div className="col-12 py-3">
                    <div className="h2 mt-0">
                      {this.state.orgFollowedCount
                        ? this.state.orgFollowedCount
                        : 0}
                    </div>
                    <div
                      className="text-uppercase"
                      onClick={this.handleOrganizationsClick}
                    >
                      Orgs Followed
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-2">
                <div className="card flex-row bg-purple rounded-right align-items-center align-items-stretch border-0">
                  <div className="col-12 py-3">
                    <div className="h2 mt-0">
                      {this.state.usersFollowed ? this.state.usersFollowed : 0}
                    </div>
                    <div
                      className="text-uppercase"
                      onClick={this.handleUsersClick}
                    >
                      Users Followed
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-2">
                <div className="card flex-row bg-purple rounded-right align-items-center align-items-stretch border-0">
                  <div className="col-12 py-3">
                    <div className="h2 mt-0">
                      {this.state.eventCount ? this.state.eventCount : 0}
                    </div>
                    <div
                      className="text-uppercase"
                      onClick={this.handleEventsClick}
                    >
                      Events
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-xl-2">
                <div className="card flex-row bg-purple rounded-right align-items-center align-items-stretch border-0">
                  <div className="col-12 py-3">
                    <div className="h2 mt-0">
                      {this.state.totalJobsCount
                        ? this.state.totalJobsCount
                        : 0}
                    </div>
                    <div
                      className="text-uppercase"
                      onClick={this.handleActiveJobsClick}
                    >
                      Total Active Jobs
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-xl-2">
                <div className="card flex-row bg-purple rounded-right align-items-center align-items-stretch border-0">
                  <div className="col-12 py-3">
                    <div className="h2 mt-0">
                      {this.state.jobsAppliedForCount
                        ? this.state.jobsAppliedForCount
                        : 0}
                    </div>
                    <div
                      className="text-uppercase"
                      onClick={this.handleActiveJobApps}
                    >
                      Jobs Applied For
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="row">
                  <Message currentUser={this.props.currentUser} />
                </div>
                <div className="row justify-content-center">
                  <div className="col-lg-6">
                    <InstantMessager currentUser={this.props.currentUser} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
SeekerDashboard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};
export default SeekerDashboard;
