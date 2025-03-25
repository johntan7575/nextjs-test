"use client";

import React, { useState } from "react";
import { Table, Space, DatePicker, Button, Input, Modal } from "antd";
import type { TableColumnsType, TableProps, GetProps } from "antd";
import { Report } from "../interfaces/report";
import dayjs from "dayjs";
import {
  AudioOutlined,
  EyeOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

type OnChange = NonNullable<TableProps<Report>["onChange"]>;
type Filters = Parameters<OnChange>[1];
type Sorts = Parameters<OnChange>[2];

const data: Report[] = [
  {
    id: "1",
    title: "Quarterly Financial Report",
    date: "2024-03-01",
    fileName: "report1.pdf",
    topics: ["Finance", "Q1"],
    categories: ["Financial"],
    keywords: ["Revenue", "Growth"],
  },
  {
    id: "2",
    title: "Annual Market Analysis",
    date: "2024-01-15",
    fileName: "report2.pdf",
    topics: ["Market", "Annual"],
    categories: ["Research", "Analysis"],
    keywords: ["Trends", "Competition"],
  },
];

const HomePage: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null]);
  const [searchText, setSearchText] = useState<string>("");

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(Array.isArray(sorter) ? sorter[0] : sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
    setDateRange([null, null]);
    setSearchText("");
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setDateRange([null, null]);
    setSearchText("");
  };

  // Dynamically extract unique filter values from reports
  const uniqueValues = (key: keyof Report) => {
    const allValues = data.flatMap((item) => item[key]);
    return [...new Set(allValues)].map((value) => ({ text: value, value }));
  };

  const filteredData = data.filter((item) => {
    // Date range filtering
    if (dateRange[0] && dateRange[1]) {
      const itemDate = dayjs(item.date);
      if (
        !(
          itemDate.isAfter(dateRange[0], "day") &&
          itemDate.isBefore(dateRange[1], "day")
        ) &&
        !itemDate.isSame(dateRange[0], "day") &&
        !itemDate.isSame(dateRange[1], "day")
      ) {
        return false;
      }
    }

    // Text search filtering
    if (searchText) {
      const lowerCaseSearch = searchText.toLowerCase();
      return (
        item.title.toLowerCase().includes(lowerCaseSearch) ||
        item.fileName.toLowerCase().includes(lowerCaseSearch) ||
        item.topics.some((topic) =>
          topic.toLowerCase().includes(lowerCaseSearch)
        ) ||
        item.categories.some((category) =>
          category.toLowerCase().includes(lowerCaseSearch)
        ) ||
        item.keywords.some((keyword) =>
          keyword.toLowerCase().includes(lowerCaseSearch)
        )
      );
    }

    return true; // Show all if no filters applied
  });

  const columns: TableColumnsType<Report> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortOrder: sortedInfo?.columnKey === "title" ? sortedInfo.order : null,
      width: 300,
    },
    {
      title: "Date of Operation",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      sortOrder: sortedInfo?.columnKey === "date" ? sortedInfo.order : null,
      width: 100,
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      render: (categories: string[]) => categories.join(", "), // Format categories as a comma-separated string
      filters: uniqueValues("categories"),
      filteredValue: filteredInfo.categories || null,
      onFilter: (value, report) => report.categories.includes(value as string),
      width: 150,
    },
    {
      title: "Topics",
      dataIndex: "topics",
      key: "topics",
      render: (topics: string[]) => topics.join(", "), // Format topics as a comma-separated string
      filters: uniqueValues("topics"),
      filteredValue: filteredInfo.topics || null,
      onFilter: (value, report) => report.topics.includes(value as string),
      width: 200,
    },
  ];

  const showModal = (report: Report) => {
    setSelectedReport(report);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedReport(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedReport(null);
  };

  const handleView = () => {
    if (selectedReport) {
      console.log("View file:", selectedReport.fileName); // Handle view action
    }
    setIsModalVisible(false);
  };

  const handleDownload = () => {
    if (selectedReport) {
      console.log("Download file:", selectedReport.fileName); // Handle download action
    }
    setIsModalVisible(false);
  };

  return (
    <div className="flex w-screen justify-center">
      <div className="flex flex-col w-9/10">
        <Space className="mb-4">
          <Input.Search
            size="large"
            placeholder="Search Reports"
            allowClear
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            style={{ width: 300 }}
          />
        </Space>
        <Space className="mb-4">
          <RangePicker
            size="large"
            onChange={(dates) =>
              setDateRange(dates ? [dates[0], dates[1]] : [null, null])
            }
            value={dateRange}
          />
          <Button size="large" onClick={clearFilters}>
            Clear Filters
          </Button>
          <Button size="large" onClick={clearAll}>
            Reset
          </Button>
        </Space>
        <Table
          size="large"
          columns={columns}
          dataSource={filteredData}
          onChange={handleChange}
          rowKey="id"
          pagination={{ pageSize: 6 }}
          onRow={(record) => ({
            onClick: () => showModal(record),
          })}
        />

        {/* Modal for actions */}
        <Modal
          title={`Actions for ${selectedReport?.fileName}`}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Space>
            <Button icon={<EyeOutlined />} onClick={handleView} type="primary">
              View
            </Button>
            <Button
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              type="primary"
            >
              Download
            </Button>
          </Space>
        </Modal>
      </div>
    </div>
  );
};

export default HomePage;
