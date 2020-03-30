import React from "react";
import PropTypes from "prop-types";
import _logger from "sabio-debug";
import * as adminDashboardService from "../../services/adminDashboardService";
import Messages from "../../components/message/Message";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    _logger("getAll");
    this.state = {
      id: this.props.currentUser.id,
      totalJobsCount: "",
      jobsAppliedForCount: "",
      eventCount: "",
      organizationsCount: ""
    };
  }

  componentDidMount() {
    adminDashboardService.getAll(this.state).then(this.onGetAllSuccess);
  }

  onGetAllSuccess = response => {
    _logger(response);
    const adminDashboard = response.item[0];
    this.setState(() => {
      return {
        totalJobsCount: adminDashboard.totalJobsCount,
        jobsAppliedForCount: adminDashboard.jobsAppliedForCount,
        eventCount: adminDashboard.eventCount,
        organizationsCount: adminDashboard.organizationsCount
      };
    });
  };

  handleSelectOrganizations = () => {
    _logger("organizations is firing");
    this.props.history.push("/organizations");
  };
  handleSelectEvents = () => {
    _logger("events is firing");
    this.props.history.push("/events");
  };
  handleSelectJobs = () => {
    _logger("jobs is firing");
    this.props.history.push("/jobs");
  };
  handleSelectCurrentApplications = () => {
    _logger("current applications");
    this.props.history.push("/jobs");
  };
  render() {
    return (
      <div>
        <div className="rag-fadeIn-enter-done">
          <div className="content-wrapper">
            <div className="content-heading">
              <div>
                Dashboard<small>Welcome to Interns LA!</small>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-xl-3">
                <div className="card flex-row align-items-center align-items-stretch border-0">
                  <div className="col-4 d-flex align-items-center bg-primary-dark justify-content-center rounded-left">
                    <em className="icon-cloud-upload fa-3x" />
                  </div>
                  <div className="col-8 py-3 bg-primary rounded-right">
                    <div className="h2 mt-0">
                      {this.state.organizationsCount
                        ? this.state.organizationsCount
                        : 0}
                    </div>
                    <div
                      className="text-uppercase"
                      onClick={this.handleSelectOrganizations}
                    >
                      Organizations
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3">
                <div className="card flex-row align-items-center align-items-stretch border-0">
                  <div className="col-4 d-flex align-items-center bg-purple-dark justify-content-center rounded-left">
                    <em className="icon-globe fa-3x" />
                  </div>
                  <div className="col-8 py-3 bg-purple rounded-right">
                    <div className="h2 mt-0">
                      {this.state.eventCount ? this.state.eventCount : 0}
                    </div>
                    <div
                      className="text-uppercase"
                      onClick={this.handleSelectEvents}
                    >
                      Events
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-xl-3">
                <div className="card flex-row align-items-center align-items-stretch border-0">
                  <div className="col-4 d-flex align-items-center bg-green-dark justify-content-center rounded-left">
                    <em className="icon-bubbles fa-3x" />
                  </div>
                  <div className="col-8 py-3 bg-green rounded-right">
                    <div className="h2 mt-0">
                      {this.state.jobsAppliedForCount
                        ? this.state.jobsAppliedForCount
                        : 0}
                    </div>
                    <div
                      className="text-uppercase"
                      onClick={this.handleSelectJobs}
                    >
                      Jobs
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-xl-3">
                <div className="card flex-row align-items-center align-items-stretch border-0">
                  <div className="col-4 d-flex align-items-center bg-green-dark justify-content-center rounded-left">
                    <em className="icon-bubbles fa-3x" />
                  </div>
                  <div className="col-8 py-3 bg-green rounded-right">
                    <div className="h2 mt-0">
                      {this.state.totalJobsCount
                        ? this.state.totalJobsCount
                        : 0}
                    </div>
                    <div
                      className="text-uppercase"
                      onClick={this.handleSelectCurrentApplications}
                    >
                      Current openings
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Messages currentUser={this.props.currentUser} />
      </div>
    );
  }
}
Dashboard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired
  })
};
export default Dashboard;
