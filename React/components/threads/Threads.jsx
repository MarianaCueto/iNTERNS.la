import React from "react";
import Swal from "sweetalert";
import ThreadCard from "./ThreadCard";
import _logger from "sabio-debug";
import * as threadsService from "../../services/threadsService";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import PropTypes from "prop-types";
import Search from "../utility/Search";
import "./Thread.css";

class Threads extends React.Component {
  constructor(props) {
    super(props);
    _logger("Threads");
    this.state = {
      threads: [],
      search: "",
      mappedThread: [],
      isSearching: false,
      pagination: {
        current: 1,
        totalCount: 0,
        pageSize: 8,
      },
    };
  }

  componentDidMount() {
    this.getPaginate(
      this.state.pagination.current - 1,
      this.state.pagination.pageSize
    );
  }

  getPaginate = (pageIndex, pageSize) => {
    threadsService
      .paginate(pageIndex, pageSize)
      .then(this.getAllSuccess)
      .catch(this.getAllError);
  };

  getAllSuccess = (res) => {
    const threads = res.item.pagedItems;
    const mappedThread = threads.map(this.mapThread);
    let pagination = {
      current: res.item.pageIndex + 1,
      totalCount: res.item.totalCount,
      pageSize: 8,
    };
    this.setState((prevState) => {
      return {
        ...prevState,
        threads,
        mappedThread,
        pagination,
      };
    });
  };

  getAllError = () => {
    _logger("error getting all");
    this.resetState();
  };

  resetState = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        threads: [],
        mappedThread: [],
        pagination: {
          current: 1,
          totalCount: 0,
          pageSize: 8,
        },
      };
    });
  };

  mapThread = (thread) => {
    return (
      <ThreadCard
        thread={thread}
        key={thread.id}
        onEditClicked={this.handleEditClick}
        handleDelete={this.handleDelete}
        onSelectClicked={this.handleSelectClick}
        currentUser={this.props.currentUser}
      />
    );
  };

  handleDelete = (id) => {
    this.deleteThread(id);
  };

  deleteThread = (id) => {
    Swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Thread!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        threadsService
          .deleteById(id)
          .then(this.deleteSuccess)
          .catch(this.deleteError);
        Swal("Poof! Your Thread has been deleted!", {
          icon: "success",
        });
      } else {
        Swal("Your Thread is still in our system!");
      }
    });
    _logger(id);
  };

  deleteSuccess = () => {
    _logger("Delete Success");
    const page = this.state.pagination;
    this.getPaginate(page.current - 1, page.pageSize);
  };

  deleteError = () => {
    _logger("Delete Error");
  };

  handleEditClick = (thread) => {
    this.props.history.push(`/threads/${thread.id}/edit`);
    _logger("edit");
  };

  handleCreateClick = () => {
    _logger("create is firing");
    this.props.history.push("/thread/new");
  };

  handleSearch = (e) => {
    _logger(e, "handle search is firing");
    this.setState((preState) => {
      return { ...preState, search: e };
    });
    const data = e;
    const page = this.state.pagination;
    this.handleSearching(data, page.current, page.pageSize);
  };

  handleSearching = (data, pageIndex, pageSize) => {
    threadsService
      .search(data, pageIndex - 1, pageSize)
      .then(this.searchSuccess)
      .catch(this.searchError);
  };
  searchSuccess = (res) => {
    _logger("searchSuccess");
    this.getAllSuccess(res);
  };

  onNextPage = (page) => {
    _logger(page);
    if (this.state.search && this.state.search.length > 0) {
      this.handleSearching(
        this.state.search,
        page,
        this.state.pagination.pageSize
      );
    } else {
      this.setState(
        (prevState) => {
          return {
            ...prevState,
            pagination: {
              ...prevState.pagination,
              current: page - 1,
            },
          };
        },
        () => this.getPaginate(page - 1, this.state.pagination.pageSize)
      );
    }
  };

  searchError = () => {
    _logger("search error is firing");
    this.resetState();
  };

  resetSearch = () => {
    this.setState({ search: "", isSearching: false }, () =>
      this.getPaginate(0, this.state.pagination.pageSize)
    );
  };
  handleSelectClick = (thread) => {
    _logger("select is firing");
    this.props.history.push({
      pathname: `/threads/${thread.id}`,
      thread,
    });
  };

  render() {
    return (
      <div className="p-5">
        <div className="threads-content-wrapper">
          <h1>Forum - Discussion</h1>
          <div className="d-flex justify-content-between p-3">
            <div>
              <button
                className="btn btn-primary"
                onClick={this.handleCreateClick}
                onChange={this.onChange}
              >
                Create
              </button>
            </div>
            <div className="">
              <Search
                getAllPaginated={this.getPaginate}
                searchBtnClick={this.handleSearch}
                updateSearchQuery={this.resetSearch}
                searchQuery={this.state.search}
                isSearching={this.state.isSearching}
              />
            </div>
          </div>
          <div className="">{this.state.mappedThread}</div>
        </div>
        <div className="d-flex justify-content-md-center">
          <Pagination
            onChange={this.onNextPage}
            current={this.state.pagination.current}
            pageSize={this.state.pagination.pageSize}
            total={this.state.pagination.totalCount}
            className="customPaginate d-flex justify-content-center"
          />
        </div>
        {this.state.mappedThread.length === 0 ? (
          <p>No Records Found</p>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
Threads.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    tenantId: PropTypes.string,
    avatarUrl: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
export default Threads;
