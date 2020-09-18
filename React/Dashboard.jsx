import React from "react";
import PropTypes from "prop-types";
import * as adminDashboardService from "../../services/adminDashboardService";
import Messages from "../../components/message/Message";
import InstantMessager from "../../components/message/InstantMessager";
import "./Dashboard.css";
import JobCard from "./JobCard";
import MemberCard from "./MemberCard";
import OrgCard from "./OrgCard";
import BarChart from "../../components/charts/BarChart";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.currentUser.id,
      totalJobsCount: "",
      totalUsersCount: "",
      eventCount: "",
      organizationsCount: "",
      orgDates: [],
      userDates: [],
      mappedRecentJobs: [],
      mappedRecentUsers: [],
      mappedRecentOrgs: [],
    };
  }

  componentDidMount() {
    adminDashboardService.getAll(this.state).then(this.onGetAllSuccess);
    adminDashboardService.adminRecentMetrics().then(this.metricsSuccess);
  }
  metricsSuccess = (res) => {
    const recentJobs = res.item[0].recentJobs || [];
    const recentOrgs = res.item[0].recentOrganizations || [];
    const recentUsers = res.item[0].recentUsers || [];
    const orgDates = recentJobs.map(getDateCreated);
    const userDates = recentOrgs.map(getDateCreated);
    const mappedRecentJobs = recentJobs.slice(0, 6).map(this.mapRecentJobs);
    const mappedRecentOrgs = recentOrgs.slice(0, 6).map(this.mapRecentOrgs);
    const mappedRecentUsers = recentUsers.slice(0, 6).map(this.mapRecentUsers);
    this.setState({
      orgDates,
      userDates,
      mappedRecentJobs,
      mappedRecentUsers,
      mappedRecentOrgs,
    });
  };

  mapRecentJobs = (job) => <JobCard job={job} key={job.id} />;
  mapRecentUsers = (member, index) => (
    <MemberCard member={member} key={index} />
  );
  mapRecentOrgs = (member) => <OrgCard member={member} key={member.id} />;

  onGetAllSuccess = (response) => {
    const adminDashboard = response.item[0];
    this.setState(() => {
      return {
        totalJobsCount: adminDashboard.totalJobsCount,
        totalUsersCount: adminDashboard.jobsAppliedForCount,
        eventCount: adminDashboard.eventCount,
        organizationsCount: adminDashboard.organizationsCount,
      };
    });
  };

  handleSelectOrganizations = () => {
    this.props.history.push("/organizations");
  };
  handleSelectEvents = () => {
    this.props.history.push("/events");
  };
  handleSelectUser = () => {
    this.props.history.push("/seekers");
  };
  handleSelectCurrentApplications = () => {
    this.props.history.push("/listings");
  };
  render() {
    return (
      <>
        <div>
          <div className="rag-fadeIn-enter-done">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-md-12 col-lg-6 col-xl-3">
                  <div className="card flex-row align-items-center align-items-stretch border-0">
                    <div className="col-4 d-flex align-items-center bg-purple-dark justify-content-center rounded-left">
                      <em className="icon-bubbles fa-3x" />
                    </div>
                    <div className="col-8 py-3 bg-purple rounded-right">
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
                <div className="col-md-6 col-xl-3">
                  <div className="card flex-row align-items-center align-items-stretch border-0">
                    <div className="col-4 d-flex align-items-center bg-purple-dark justify-content-center rounded-left">
                      <em className="icon-cloud-upload fa-3x" />
                    </div>
                    <div className="col-8 py-3 bg-purple rounded-right">
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
                <div className="col-md-12 col-lg-6 col-xl-3">
                  <div className="card flex-row align-items-center align-items-stretch border-0">
                    <div className="col-4 d-flex align-items-center bg-purple-dark justify-content-center rounded-left">
                      <em className="icon-bubbles fa-3x" />
                    </div>
                    <div className="col-8 py-3 bg-purple rounded-right">
                      <div className="h2 mt-0">
                        {this.state.totalUsersCount
                          ? this.state.totalUsersCount
                          : 0}
                      </div>
                      <div
                        className="text-uppercase"
                        onClick={this.handleSelectUser}
                      >
                        Users
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row ml-2 mr-2 ">
            <div className="col-sm-6">
              <BarChart
                data={this.state.userDates}
                title="New Users"
                yAxis={["Total users", "New users"]}
              />
            </div>
            <div className="col-sm-6">
              <BarChart
                data={this.state.orgDates}
                title="New Organizations"
                yAxis={["Total organizations", "New organizations"]}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <div className="card-box mb-5 ml-3 mr-3 text-center card">
                <div className="my-3">
                  <h2 className="font-weight-bold font-size-lg mb-1 text-black">
                    New Members
                  </h2>
                  <p className="text-black-50 mb-0">Recently Joined Members</p>
                </div>
                <div className="d-flex flex-row flex-wrap justify-content-center">
                  {this.state.mappedRecentUsers}
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-4">
              <div className="card-box mb-5 card">
                <div className="card-header">
                  <h2 className="font-size-lg mb-0 py-2 font-weight-bold text-center">
                    New Jobs
                  </h2>
                  <p className="text-black-50 mb-0 text-center">
                    Recently Added Jobs
                  </p>
                </div>
                <div className="card-body">{this.state.mappedRecentJobs}</div>
              </div>
            </div>
            <div className="col-sm-12 col-md-4">
              <div className="card-box mb-5 ml-3 mr-3 text-center card">
                <div className="my-3">
                  <h2 className="font-weight-bold font-size-lg mb-1 text-black">
                    New Orgs
                  </h2>
                  <p className="text-black-50 mb-0">
                    Recently Joined Organizations
                  </p>
                </div>
                <div className="d-flex flex-row flex-wrap justify-content-center">
                  {this.state.mappedRecentOrgs}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Messages currentUser={this.props.currentUser} />
        <div className="col-4 mx-auto" >
          <InstantMessager currentUser={this.props.currentUser} />
        </div>
      </>
    );
  }
}
Dashboard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};
export default Dashboard;

function getDateCreated(element) {
  return element.dateCreated;
}
