import {
  TeamOutlined,
  UserOutlined,
  ProfileOutlined,
  GroupOutlined,
} from "@ant-design/icons";

import { Outlet } from "react-router-dom";

import styles from "./styles.module.scss";
import Menu from "./../components/Menu";

const items = [
  {
    label: "Quản lý người dùng",
    key: "user_management",
    icon: <TeamOutlined />,
  },
  {
    label: "Phân quyền vai trò",
    key: "role_delegation",
    icon: <UserOutlined />,
  },
  {
    label: "Danh mục vai trò",
    key: "role_category",
    icon: <ProfileOutlined />,
  },
  {
    label: "Đơn vị",
    key: "unit",
    icon: <GroupOutlined />,
  },
  {
    label: "Phòng ban",
    key: "department",
    icon: <GroupOutlined />,
  },
];

const MainLayout = () => {
  return (
    <div className={styles.main__layout}>
      <Menu
        style={{ width: 256, height: "100%", padding: 8 }}
        items={items}
        defaultSelectedKeys={["user_management"]}
      />
      <Outlet />
    </div>
  );
};

export default MainLayout;
