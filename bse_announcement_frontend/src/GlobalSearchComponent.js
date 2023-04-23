import React from "react";
import { Input } from "semantic-ui-react";

export default class DropDownComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ""
    };
  }

  handleChange = event => {
    this.setState({ searchInput: event.target.value }, () =>
      this.globalSearch()
    );
  };

  globalSearch = () => {
    let { searchInput } = this.state;
    let filteredData = this.props.data.filter(value => {
      return (
        value.company_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.announcement.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.announcement_type
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    });
    this.props.handleSetData(filteredData);
  };

  render() {
    return (
      <div style={{ display: "flex", alignItems: "center" }} >
        <label style={{ marginRight: "10px" }}>Search:</label>
        <Input
          size="large"
          name="searchInput"
          value={this.state.searchInput || ""}
          onChange={this.handleChange}
          style={{ flex: 1 }}
        />
      </div>
    );
  }
}
