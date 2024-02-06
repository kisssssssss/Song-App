import { memo } from "react";
import { Divider } from "@nextui-org/react";

import Icon from "components/icon";
import Theme from "./Theme";
import User from "./User";

const TitleBar = memo(() => {
  return (
    <>
      <Icon name="search" size={[22, 22]} className="no-region mx-1.5 cursor-pointer transition-all duration-1000 hover:fill-primary-400" />
      <Icon name="cloud" size={[22, 22]} className="no-region mx-1.5 cursor-pointer transition-all duration-1000 hover:fill-primary-400" />
      <Icon name="notification" size={[20, 20]} className="shake no-region mx-1.5 cursor-pointer transition-all duration-1000 hover:fill-primary-400" />
      <User />
      <Divider className="mx-2.5 h-5" orientation="vertical" />
      <Theme />
      <Icon name="set" size={[22, 22]} className="no-region mx-1.5 cursor-pointer transition-all duration-1000 hover:rotate-180 hover:fill-primary-400" />
      <Divider className="mx-2.5 h-5" orientation="vertical" />
      <Icon
        name="minimize"
        size={[20, 20]}
        className="no-region mx-1.5 cursor-pointer transition-all duration-1000 hover:rotate-180 hover:fill-primary-400"
        onClick={window.electron.minimize}
      />
      <Icon
        name="maximize"
        size={[20, 20]}
        className="no-region mx-1.5 cursor-pointer transition-all duration-1000 hover:rotate-180 hover:fill-primary-400"
        onClick={window.electron.maximize}
      />
      <Icon
        name="close"
        size={[20, 20]}
        className="no-region mx-1.5 cursor-pointer transition-all duration-1000 hover:rotate-180 hover:fill-primary-400"
        onClick={window.electron.close}
      />
    </>
  );
});

export default TitleBar;
