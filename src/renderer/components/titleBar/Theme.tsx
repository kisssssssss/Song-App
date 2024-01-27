import { memo, useEffect, useRef, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import classNames from "classnames";

import Icon from "assets/icon";

import useStore, { Data } from "../../store";

export default memo(() => {
  const updateComponent = useState("")[1];

  const light = useRef<HTMLDivElement>();
  const dark = useRef<HTMLDivElement>();
  const gray = useRef<HTMLDivElement>();

  const change = useStore((state) => state.changeTheme);

  const changeTheme = (theme: Data["theme"]) => {
    updateComponent(theme);
    change(theme);
    switch (theme) {
      case "dark":
        light.current?.classList.remove("text-primary-600");
        gray.current?.classList.remove("text-primary-600");
        dark.current?.classList.add("text-primary-600");
        break;
      case "":
        light.current?.classList.add("text-primary-600");
        gray.current?.classList.remove("text-primary-600");
        dark.current?.classList.remove("text-primary-600");
        break;
      case "gray":
        light.current?.classList.remove("text-primary-600");
        gray.current?.classList.add("text-primary-600");
        dark.current?.classList.remove("text-primary-600");
        break;
    }
  };

  let lightClass = classNames("w-full cursor-pointer rounded-md py-1 pl-3 hover:bg-default-300/60", {
    " text-primary-600": document.documentElement.className === "",
  });
  let darkClass = classNames("w-full cursor-pointer rounded-md py-1 pl-3 hover:bg-default-300/60", {
    " text-primary-600": document.documentElement.className === "dark",
  });
  let grayClass = classNames("w-full cursor-pointer rounded-md py-1 pl-3 hover:bg-default-300/60", {
    " text-primary-600": document.documentElement.className === "gray",
  });

  return (
    <Popover placement="bottom" shouldCloseOnBlur={true}>
      <PopoverTrigger>
        <Icon name="theme" size={[22, 22]} className="no-region mx-1.5 my-1 cursor-pointer hover:fill-primary-400" />
      </PopoverTrigger>
      <PopoverContent className="block min-h-[60px] min-w-min max-w-[150px] select-none p-2 text-default-700">
        <p className="mb-1 ml-2 mt-1.5 text-left text-sm text-default-500/60">外观</p>
        <div ref={light} className={lightClass} onClick={() => changeTheme("")}>
          白色
        </div>
        <div ref={dark} className={darkClass} onClick={() => changeTheme("dark")}>
          黑色
        </div>
        <div ref={gray} className={grayClass} onClick={() => changeTheme("gray")}>
          灰色
        </div>
        <p className="mb-2 ml-2 mt-1.5 text-sm text-default-500/60">主题颜色</p>
        <div className="grid grid-cols-5">
          <span className="mx-2 mb-2 inline-block h-4 w-4 cursor-pointer rounded-full bg-primary-500 transition-transform hover:scale-125"></span>
          {/* FIXME: 当span放大时，会出现文字模糊的情况 */}
          {/* <Icon name="add" size={[16, 16]} style={{ WebkitFontSmoothing: "antialiased" }} className="mx-2 mb-2 scale-125 cursor-pointer antialiased" /> */}
        </div>
      </PopoverContent>
    </Popover>
  );
});
