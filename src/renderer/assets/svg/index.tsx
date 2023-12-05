import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

import maximize from "./maximize.svg"
import song from "./song.svg"
import list from "./list.svg"

type propsType = Partial<CustomIconComponentProps>;

export const Maximize = (props: propsType & { onClick?: () => any }) => (
  <Icon component={maximize} {...props} onClick={props.onClick} />
);

export const Song = (props: propsType) => (
  <Icon component={song} {...props} />
)

export const List = (props: propsType) => (
  <Icon component={list} {...props} />
)