import React, { useState, useRef } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";


const ViewDonation = ({ rowSelection, data, rowKey, scroll }) => {
  let tableData = [];
  if (data?.length > 0) {
    tableData = data.map((v) => ({ ...v, key: v.id }));
  }
  const inputEl = useRef(null);
  const [searchText, setSeachText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={inputEl}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => inputEl.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSeachText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSeachText("");
  };

  let columns = [
      {
        title: "Sr.No",
        key: 'id',
        dataIndex: "sr",
        sorter: (a, b) =>  a.sr - b.sr,
        render: (text) => <div>{text}</div>,
      },
      {
        title: "Donation Name",
        dataIndex: "name",
        key: "id",
      },
      {
        title: "Reference",
        dataIndex: "reference",
        key: "id"
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "id"
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "id"
      },
      {
        title: "Theme",
        dataIndex: "theme",
        key: "id"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "id",
        sorter: (a, b) => a.status - b.status,
        ...getColumnSearchProps("status"),
      },
    ];


  return (
    <Table
      rowKey={rowKey}
      scroll={scroll}
      className="table-headings"
      columns={columns}
      rowSelection={rowSelection}
      dataSource={tableData ? tableData : []}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default ViewDonation;
