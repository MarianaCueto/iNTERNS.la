import React from "react";
import PropTypes from "prop-types";
import { getForDash } from "../../services/organizationsServices";
import logger from "sabio-debug";
import OrgMainCard from "./OrgMainCard";
import "../venue/Venue.css";

const _logger = logger.extend("Landing");

class OrganizationMain extends React.Component {
  state = {
    mappedOrg: [],
  };

  componentDidMount = () => {
    getForDash().then(this.onSuccess).catch(this.handleError);
  };
  onSuccess = (res) => {
    _logger(res, "success");
    const org = res.items;
    const mappedOrg = org.map(this.mapOrg);
    this.setState({ mappedOrg });
  };

  mapOrg = (org) => (
    <OrgMainCard org={org} key={org.id} handleInfo={this.handleInfo} />
  );

  handleError = (error) => {
    _logger(error, ":(");
  };

  handleInfo = (props) => {
    _logger("arzooooooooo", props.org);
    let org = props.org.id;
    this.props.history.push(`/organization/${org}/dashboard`);
  };
  onClickSubmit = () => {
    this.props.history.push("/organization/new");
  };

  createNewOrg = () => {
    this.props.history.push("/organization/new");
  };

  inviteNewOrgMember = () => {
    this.props.history.push("/organizations/invite");
  };
  render() {
    return (
      <React.Fragment>
        <div className="card-body row">
          <div className="col-sm-12 col-md-7">
            <button
              type="submit"
              className="btn btn-add mb-2"
              onClick={this.onClickSubmit}
            >
              Add Organization
            </button>
          </div>
        </div>
        {/* <div className="content-wrapper" style={{ marginTop: "0px" }}> */}
        <div className="row ml-1 mr-1 mt-2"> {this.state.mappedOrg}</div>
        {/* </div> */}
      </React.Fragment>
    );
  }
}
OrganizationMain.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
export default OrganizationMain;
