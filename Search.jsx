import React from "react";
import PropTypes from "prop-types";

const Search = (props) => {
  const keyPress = (event) => {
    if (event.keyCode === 13) {
      textInput.current.value === ""
        ? props.getAllPaginated()
        : props.searchBtnClick(textInput.current.value);
    }
  };
  let textInput = React.createRef();
  const handleReset = () => {
    props.updateSearchQuery("");
    textInput.current.value = "";
    props.isSearching && props.getAllPaginated();
  };
  const liveSearch = () => {
    if (textInput.current.value === "") {
      props.getAllPaginated();
      props.updateSearchQuery("");
    } else {
      props.searchBtnClick(textInput.current.value);
    }
  };
  return (
    <>
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          placeholder="Search"
          aria-label="Search"
          name="search"
          onChange={liveSearch}
          onKeyDown={keyPress}
          ref={textInput}
          value={props.searchQuery}
        />
        {props.searchQuery === "" ? null : (
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-default"
              aria-label="search"
              onClick={handleReset}
            >
              <i className="fas fa-times-circle" />
            </button>
          </span>
        )}
      </div>
    </>
  );
};
Search.propTypes = {
  searchBtnClick: PropTypes.func.isRequired,
  getAllPaginated: PropTypes.func.isRequired,
  keyPress: PropTypes.func,
  searchQuery: PropTypes.string,
  isSearching: PropTypes.bool.isRequired,
  updateSearchQuery: PropTypes.func.isRequired,
};
export default React.memo(Search);
