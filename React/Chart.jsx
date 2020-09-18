import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import * as followerService from "../../services/followerService";
import logger from "sabio-debug";

const _logger = logger.extend("Chart");

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Followers",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          }
        ]
      }
    };
  }

  componentDidMount() {
    this.getFollower(this.props.orgId);
    // this.getFollower(14);
  }

  getFollower = id => {
    followerService
      .getDateByOrgId(id)
      .then(this.onGetFollowerSuccess)
      .catch(this.onGetFollowerFail);
  };

  onGetFollowerSuccess = res => {
    let dates = res.item;
    let data = [
      dates.january,
      dates.february,
      dates.march,
      dates.april,
      dates.may,
      dates.june,
      dates.july,
      dates.august,
      dates.september,
      dates.october,
      dates.november,
      dates.december
    ];

    this.setState(prevState => ({
      chartData: {
        ...prevState,
        datasets: [
          {
            ...prevState.datasets,
            label: "Followers",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: data
          }
        ]
      }
    }));
  };

  onGetFollowerFail = err => {
    _logger("error", err);
  };

  render() {
    return (
      <div className="col-6">
        <h2>Followers by Month</h2>
        <Line
          data={this.state.chartData}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true
          }}
        />
      </div>
    );
  }
}

Chart.propTypes = {
  orgId: PropTypes.number
};

export default Chart;
