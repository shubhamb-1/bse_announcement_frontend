
import React, { useState, useEffect } from "react";
import GlobalSearchComponent from "./GlobalSearchComponent";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import DatePick from "./DatePick";

const Table = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    getData();
    getColumns();
  }, []);

  useEffect(() => {
    filterData(selectedDate);
  }, [selectedDate]);

  const getColumns = () => {
    let columns = [
      {
        Header: "Company Name",
        accessor: "company_name",
        sortable: false,
        show: true,
        style: {
          whiteSpace: "normal",
          wordWrap: "break-word",
          height: (row) => {
            const height = (row.original.announcement.length / 50) * 20;
            return height < 40 ? 40 : height;
          },
        },
        displayValue: "Company Name",
      },
      {
        Header: "Announcement",
        accessor: "announcement",
        sortable: false,
        show: true,
        style: {
          whiteSpace: "normal",
          wordWrap: "break-word",
          height: (row) => {
            const height = (row.original.announcement.length / 50) * 20;
            return height < 40 ? 40 : height;
          },
        },
        // width:600,
        displayValue: "Announcement ",
      },
      {
        Header: "Announcement Type",
        accessor: "announcement_type",
        sortable: false,
        show: true,
        displayValue: " Announcement Type ",
      },
      {
        Header: "Announcement Link",
        accessor: "announcement_link",
        sortable: false,
        show: true,
        Cell: (e) => (
          <a href={e.value} target="_blank" rel="noopener noreferrer">
            {" "}
            {e.value}{" "}
          </a>
        ),
        displayValue: " Announcement Link ",
      },
      {
        Header: "Time",
        accessor: "time",
        sortable: true,
        show: true,
        displayValue: "Time",
      },
    ];
    setColumns(columns);
  };

  const getData = () => {
    fetch("http://localhost:8000/announcements")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setFilteredData(json);
      });
  };

  const handleSetData = (data) => {
    setFilteredData(data);
  };

  const filterData = (date) => {
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.time);
      return (
        itemDate.getDate() === date.getDate() &&
        itemDate.getMonth() === date.getMonth() &&
        itemDate.getFullYear() === date.getFullYear()
      );
    });
    setFilteredData(filtered);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-md-6 mt-4 mb-4 float-left">
          <DatePick onDateSelect={handleDateSelect} />
        </div>
        <div className="col-md-6 mb-3 mt-4 float-right">
          <GlobalSearchComponent data={data} handleSetData={handleSetData} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ReactTable
            data={filteredData}
            columns={columns}
            initialState={{
              sortBy: [{ id: "time", desc: true }],
            }}
            defaultPageSize={25}
            showPageSizeOptions={false}
            className="-striped -highlight"
          />
        </div>
      </div>
    </div>
  );
  
          };

export default Table;
         
