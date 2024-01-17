import React, { memo, useCallback, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import _ from "lodash";
import useStore from "../../store";

import Eye from "./eye";

// FIXME: 第一次启动应用后，输入信息，点击登录会强制刷新
// TODO: 添加手机号验证,显示错误信息
// TODO: 密码设置为MD5

export default memo<{ type: "Phone" | "163 Email"; close: Function }>(({ type, close }) => {
  // 密码是否可见
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // 账号
  let [account, setAccount] = useState<string>("");
  const accountChange = useCallback(
    (() => {
      if (type == "Phone") {
        return (value: string) => {
          if (/^1\d{10}$/.test(value)) {
            setAInvalid(false);
            setAMsg(<pre>&nbsp;</pre>);
          } else {
            setAInvalid(true);
            setAMsg("请输入正确手机号");
          }
          setAccount(value);
        };
      } else {
        return (value: string) => {
          if (/^[a-zA-Z0-9._-]+@163\.com$/.test(value)) {
            setAInvalid(false);
            setAMsg(<pre>&nbsp;</pre>);
          } else {
            setAInvalid(true);
            setAMsg("请输入正确邮箱");
          }
          setAccount(value);
        };
      }
    })(),
    [],
  );
  const [aInvalid, setAInvalid] = useState<boolean>(false);
  const [aMsg, setAMsg] = useState<React.ReactNode>(<pre>&nbsp;</pre>);
  // 密码
  let [password, setPassword] = useState<string>("");

  // 登录
  const [phoneLogin, emailLogin] = useStore((state) => [state.usePhoneLogin, state.useEmailLogin]);
  const login = async () => {
    if (type === "Phone") {
      (await phoneLogin(account, password)) && close();
    } else {
      (await emailLogin(account, password)) && close();
    }
  };

  return (
    <form>
      <Input value={account} onValueChange={accountChange} label={type} type="text" isInvalid={aInvalid} errorMessage={aMsg} />
      <Input
        value={password}
        onValueChange={setPassword}
        label="Password"
        type={isVisible ? "text" : "password"}
        endContent={<Eye status={isVisible} click={() => setIsVisible(!isVisible)} />}
        errorMessage="&nbsp;"
      />
      <Button type="submit" color="primary" className="float-right" onPress={() => login()}>
        Login
      </Button>
    </form>
  );
});
