import React from "react";
import PropTypes from "prop-types";
import _logger from "sabio-debug";
import * as organization from "../../services/orgMembersService";
import * as orgDash from "../../services/orgDashService";
import * as organizationService from "../../services/organizationsServices";
import "./Dashboard.css";
import OrgFollowerCard from "./OrgFollowerCard";
import MemberCard from "./MemberCard";
import JobCard from "./JobCard";
import "../organizations/Organization.css";
import BarChart from "../../components/charts/BarChart";
import { FaEdit } from "react-icons/fa";

class OrganizationDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobsActive: "",
      totalMembers: "",
      totalFollower: "",
      recentMetrics: {
        recentFollowers: [],
        recentMembers: [],
        recentJobs: [],
      },
      memberDates: [],
      followerDates: [],
      mappedFollowers: [],
      mappedMembers: [],
      mappedJobs: [],
    };
  }

  componentDidMount = () => {
    this.orgDashboard();
    this.orgDashboardRecentMetrics();
  };

  orgDashboardRecentMetrics = () => {
    let id = this.props.match.params.id;
    orgDash.getById(id).then(this.recentMetricsSuccess).catch();
  };

  recentMetricsSuccess = (res) => {
    const recentJobs = res.item.organizationJob || [];
    const recentMembers = res.item.organizationMember || [];
    const recentFollowers = res.item.organizationFollower || [];
    const memberDates = recentMembers.map(getDateCreated);
    const followerDates = recentFollowers.map(getDateCreated);
    const mappedJobs = recentJobs.slice(0, 6).map(this.mapJobs);
    const mappedMembers = recentMembers.slice(0, 6).map(this.mapMembers);
    const mappedFollowers = recentFollowers.slice(0, 6).map(this.mapFollowers);
    this.setState({
      recentJobs,
      recentMembers,
      recentFollowers,
      memberDates,
      followerDates,
      mappedJobs,
      mappedMembers,
      mappedFollowers,
    });
  };

  orgDashboard = () => {
    let id = this.props.match.params.id;
    organization
      .getDashboard(id)
      .then(this.dashboardSuccess)
      .catch(this.dashboardError);
  };

  mapFollowers = (follower) => (
    <OrgFollowerCard follower={follower} key={follower.userId} />
  );

  mapMembers = (member) => <MemberCard member={member} key={member.userId} />;
  mapJobs = (job) => <JobCard job={job} key={job.id} />;

  dashboardSuccess = (res) => {
    _logger("dheuv", res);
    const jobsActive = res.item.organizationOpeningCount;
    const totalMembers = res.item.organizationMemberCount;
    const totalFollower = res.item.organizationFollwerCount;
    this.setState({ jobsActive, totalMembers, totalFollower });
  };

  handleSelectClick = () => {
    let id = this.props.match.params.id;
    this.props.history.push(`/organization/${id}/jobs`);
  };

  onClickInviteRegistration = () => {
    this.props.history.push("/organizations/invite");
  };

  onEditSelecteditem = () => {
    let id = this.props.match.params.id;
    organizationService.getById(id).then(this.editOrganization);
  };

  editOrganization = (res) => {
    _logger("check the org", res);
    let id = this.props.match.params.id;
    let organization = res.item;
    this.props.history.push(`/organization/${id}/edit`, organization);
  };

  render() {
    return (
      <div>
        <div className="card-body row">
          <div className="col-sm-12 col-md-7">
            <button
              type="submit"
              className="btn btn-add mb-2"
              onClick={this.onClickInviteRegistration}
            >
              Invite to Register
            </button>
            <button
              type="button"
              className="mb-1 btn btn-edit"
              onClick={this.onEditSelecteditem}
              style={{ marginLeft: "15px" }}
            >
              <FaEdit size="15" />
            </button>
          </div>
        </div>
        <div className="rag-fadeIn-enter-done">
          <div className="content-wrapper" style={{ marginTop: "0px" }}>
            <div className="row">
              <div className="col-md-6 col-xl-4">
                <div className="card flex-row align-items-center align-items-stretch border-0">
                  <div className="col-4 d-flex align-items-center bg-purple-dark justify-content-center rounded-left">
                    <em className="icon-cloud-upload fa-3x" />
                  </div>
                  <div className="col-8 py-3 bg-purple  rounded-right">
                    <div className="h2 mt-0">{this.state.totalMembers}</div>
                    <div className="text-uppercase">Members</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-4">
                <div className="card flex-row align-items-center align-items-stretch border-0">
                  <div className="col-4 d-flex align-items-center bg-purple-dark justify-content-center rounded-left">
                    <em className="icon-globe fa-3x" />
                  </div>
                  <div className="col-8 py-3 bg-purple rounded-right">
                    <div className="h2 mt-0">{this.state.jobsActive}</div>
                    <div
                      className="text-uppercase"
                      onClick={this.handleSelectClick}
                    >
                      Active Job Openings
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-4">
                <div className="card flex-row align-items-center align-items-stretch border-0">
                  <div className="col-4 d-flex align-items-center bg-purple-dark justify-content-center rounded-left">
                    <em className="icon-bubbles fa-3x" />
                  </div>
                  <div className="col-8 py-3 bg-purple  rounded-right">
                    <div className="h2 mt-0">{this.state.totalFollower}</div>
                    <div className="text-uppercase">Followers</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <BarChart
                  data={this.state.memberDates}
                  title="New Members"
                  yAxis={["Total members", "New members"]}
                />
              </div>
              <div className="col-sm-6">
                <BarChart
                  data={this.state.followerDates}
                  title="New Followers"
                  yAxis={["Total followers", "New followers"]}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <div className="example-card-seamless">
                  <div className="card-box text-center card">
                    <div className="my-3">
                      <h2 className="font-weight-bold font-size-lg mb-1 text-black">
                        Recent Members
                      </h2>
                    </div>
                    <div className="d-flex flex-row flex-wrap justify-content-center">
                      {this.state.mappedMembers}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-4">
                <div className="card-box mb-5 card">
                  <div className="card-header">
                    <h2 className="font-size-lg mb-0 py-2 font-weight-bold text-center">
                      Jobs
                    </h2>
                  </div>
                  <div className="card-body">{this.state.mappedJobs}</div>
                </div>
              </div>
              <div className="col-sm-12 col-md-4">
                <div className="example-card-seamless">
                  <div className="card-box text-center card">
                    <div className="my-3">
                      <h2 className="font-weight-bold font-size-lg mb-1 text-black">
                        Recent Follower
                      </h2>
                    </div>
                    <div className="d-flex flex-row flex-wrap justify-content-center">
                      {this.state.mappedFollowers}
                    </div>
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
OrganizationDashboard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
};
export default OrganizationDashboard;

function getDateCreated(element) {
  if (element.dateCreated) {
    return element.dateCreated;
  }
  return element.dateFollowed;
}
