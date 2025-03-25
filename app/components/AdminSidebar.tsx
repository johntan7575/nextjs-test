"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppstoreOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const AdminSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("Navigating to:", e.key);

    const routes: Record<string, string> = {
      "1": "/admin/manage-users",
      "2": "/admin/manage-reports",
      "3": "/admin/export-activity-log",
      "4": "/admin/manage-tags",
      "9": "/navigation-two/option9",
      "10": "/navigation-two/option10",
      "11": "/submenu/option11",
      "12": "/submenu/option12",
    };

    if (routes[e.key]) {
      router.push(routes[e.key]);
    }
  };

  const items: MenuItem[] = [
    { key: "1", icon: <PieChartOutlined />, label: "Manage Users" },
    { key: "2", icon: <DesktopOutlined />, label: "Manage Reports" },
    {
      key: "sub1",
      label: "Navigation One",
      icon: <MailOutlined />,
      children: [
        { key: "3", label: "Export Activity Log" },
        { key: "4", label: "Manage Tags" },
      ],
    },
    {
      key: "sub2",
      label: "Navigation Two",
      icon: <AppstoreOutlined />,
      children: [
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" },
        {
          key: "sub3",
          label: "Submenu",
          children: [
            { key: "11", label: "Option 11" },
            { key: "12", label: "Option 12" },
          ],
        },
      ],
    },
  ];

  return (
    <div
      style={{
        width: collapsed ? 80 : 256,
        height: "100vh",
        background: "#001529",
        padding: "10px",
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleMenuClick}
      />
    </div>
  );
};

export default AdminSidebar;
