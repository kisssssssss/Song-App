import React, { memo, useCallback } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import Wrapper from "./styled";
import Scroll from "../scrollBar";
import { useNavigate } from "react-router-dom";
import { keys } from "lodash";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("音乐", "/songs", <QuestionCircleOutlined />),
  getItem("歌单", "/list", <QuestionCircleOutlined />),
  getItem("专辑", "/album", <QuestionCircleOutlined />),
  { type: "divider" },
  getItem("最近播放", "4", <QuestionCircleOutlined />),
  getItem("喜欢的音乐", "5", <QuestionCircleOutlined />),
  getItem("创建的歌单", "6", <QuestionCircleOutlined />, [
    getItem("歌单1", "123", <QuestionCircleOutlined />),
    getItem("歌单2", "sa", <QuestionCircleOutlined />),
    getItem("歌单3", "asd"),
    getItem("歌单4", "d"),
  ]),
  getItem("收藏的歌单", "7", <QuestionCircleOutlined />, [
    getItem("歌单1", "17"),
    getItem("歌单2", "18"),
    getItem("歌单3", "19"),
    getItem("歌单4", "20"),
  ]),
];

const SideBar = memo(() => {
  const navigate = useNavigate();
  const click: MenuProps['onClick'] = useCallback((info) => {
    console.log(info.key);
    // const { key } = info;
    // key.includes('/') && navigate(key);
  }, [])
  return (
    <Wrapper>
      <Scroll className="scroll" config={{ scrollbar: { fade: true, fadeOutTime: 3000 } }}>
        <Menu className="menu" mode="inline" items={items} onClick={click} />
      </Scroll>
    </Wrapper>
  );
});

export default SideBar;
