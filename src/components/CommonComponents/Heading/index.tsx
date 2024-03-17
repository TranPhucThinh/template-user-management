import cls from "classnames";

import styles from "./styles.module.scss";
import { ReactNode } from "react";

interface HeadingProps {
  type: string;
  children: ReactNode;
  className?: string;
}

export const Heading = ({
  type,
  children,
  className,
  ...props
}: HeadingProps) => (
  <h2 className={cls(styles[type], className)} {...props}>
    {children}
  </h2>
);
