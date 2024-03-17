import { useState } from "react";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";

import { Button } from "@greenglobal/greencore.fe.common";

import Menu from "../../components/Menu";
import styles from "./styles.module.scss";
import Table from "../../components/Table";
import Select from "../../components/Select";
import { Heading } from "../../components/CommonComponents/Heading";

type DataTable = {
  name: string;
  user: string;
  permission: string;
};

const dataSelect = [
  { name: "Green Global;", id: 1 },
  { name: "Microsoft", id: 2 },
  { name: "Google", id: 3 },
  { name: "Amazon", id: 4 },
  { name: "Facebook", id: 5 },
  { name: "Tesla", id: 6 },
  { name: "Intel", id: 7 },
  { name: "IBM", id: 8 },
  { name: "Samsung", id: 9 },
  { name: "Oracle", id: 10 },
];

const dataTable = [
  {
    id: 1,
    name: "Quản trị hệ thống",
    user: "admin",
    permission: "Superadmin",
  },
  {
    id: 2,
    name: "Nhân viên 1",
    user: "nv1",
    permission: "Chuyên viên",
  },
  {
    id: 3,
    name: "Nhân viên 2",
    user: "nv2",
    permission: "Chuyên viên",
  },
  {
    id: 4,
    name: "Nhân viên 3",
    user: "nv3",
    permission: "Chuyên viên",
  },
];

const items = [
  {
    label: "CT.HĐQT",
    key: "CTHĐQT",
  },
  {
    label: "TV.HĐQT",
    key: "TVHĐQT",
  },
  {
    label: "Giám Đốc",
    key: "Director",
  },
  {
    label: "Phó Giám Đốc 1",
    key: "Deputy_Director_1",
  },
  {
    label: "Phó Giám Đốc 2",
    key: "Deputy_Director_2",
  },
  {
    label: "Ban Kiểm Soát",
    key: "Audit_Committee",
  },
  {
    label: "Phòng Tổ chức hành chính",
    key: "Organizational_Administrative_Department",
  },
  {
    label: "Phòng Kế hoạch Vật tư",
    key: "Planning_Procurement_Department",
  },
  {
    label: "Phòng Tài chính Kế toán",
    key: "Finance_Accounting_Department",
  },
  {
    label: "Phòng KT&AT",
    key: "Quality_Assurance_Technology_Department",
  },
  {
    label: "Phòng Kinh doanh",
    key: "Sales_Department",
  },
  {
    label: "Công nghệ thông tin",
    key: "Information_Technology_Department",
  },
];

const Index = () => {
  const [query, setQuery] = useState({ page: 1, limit: 10 });

  const onChangePagination = (res: { page: number; limit: number }) => {
    setQuery(res);
  };

  const columns = [
    {
      key: "drag",
      width: 60,
    },
    {
      title: "STT",
      key: "stt",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, _record: DataTable, index: number) => index + 1,
    },
    {
      title: "Tên nhân viên",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Tên đăng nhập",
      key: "user",
      dataIndex: "user",
    },
    {
      title: "Quyền",
      key: "permission",
      dataIndex: "permission",
    },
    {
      title: "",
      key: "action",
      render: () => <EllipsisOutlined />,
    },
  ];

  return (
    <div className={styles.user_management}>
      <div className={styles.header}>
        <Heading type="page-title">Quản lý người dùng</Heading>
        <Button type="primary">
          <div className={styles.header__button}>
            <PlusOutlined />
            <p>Thêm người dùng</p>
          </div>
        </Button>
      </div>
      <div className={styles.content}>
        <div className={styles.content__header}>
          <p>Đơn vị</p>
          <Select style={{ width: 200 }} data={dataSelect} />
        </div>
        <div className={styles.content__body}>
          <div className={styles.body__menu}>
            <div className={styles.menu__title}>
              <p>Phòng ban</p>
            </div>
            <Menu
              items={items}
              defaultSelectedKeys={["Information_Technology_Department"]}
            />
          </div>
          <div className={styles.body__content}>
            <Table
              type="DRAG"
              pagination={{ total: 4 }}
              handleGetPageAndLimit={onChangePagination}
              query={query}
              data={dataTable}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
