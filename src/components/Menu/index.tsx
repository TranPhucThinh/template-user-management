import { Menu as MenuComponent } from "antd";
import React, { CSSProperties, Key, ReactNode } from "react";

type MenuItems = {
  label: ReactNode;
  key: Key;
  icon?: ReactNode;
  disabled?: boolean;
  children?: MenuItems[];
};

type Props = {
  /** Style of the root node */
  style?: CSSProperties;
  /** Called when a menu item is clicked */
  onClick?: (e: {
    key: string;
    keyPath: string[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
  }) => void;
  /** Array with the keys of default selected menu items */
  defaultSelectedKeys?: string[];
  /** Color theme of the SubMenu (inherits from Menu by default) */
  theme?: "light" | "dark";
  /** Menu item content. NOTE: Prop children have form same items (recursively return items), MenuItems is props of items */
  items: {
    label: ReactNode;
    key: Key;
    icon?: ReactNode;
    disabled?: boolean;
    children?: MenuItems[];
  }[];
};

const Menu = ({
  style = { width: 256 },
  onClick,
  theme = "light",
  defaultSelectedKeys,
  items,
}: Props) => {
  return (
    <MenuComponent
      onClick={onClick}
      style={style}
      theme={theme}
      defaultSelectedKeys={defaultSelectedKeys}
      items={items}
      mode="inline"
    />
  );
};

export default Menu;
