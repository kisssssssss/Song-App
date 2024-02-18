import { memo, useEffect, useState } from "react";
import useStore from "store/index";
import { Skeleton } from "@nextui-org/react";
import { getQrKey, getQrBase64, checkQrStatus } from "service/index";

export default memo<{ close: Function }>(({ close }) => {
  // 骨架屏加载
  const [isLoaded, setIsLoaded] = useState(false);
  // 二维码
  const [img, setImg] = useState("");
  // 二维码自动查询
  let timer: NodeJS.Timeout;
  // 保存cookie
  const saveCookie = useStore((state) => state.saveCookie);

  const create = async () => {
    const key = (await getQrKey()).data;
    if (key) {
      const { img } = (await getQrBase64(key)).data;
      if (img) {
        // 显示二维码
        setImg(img);
        setIsLoaded(true);
        // 开启状态查询
        timer = setInterval(async () => {
          const { code, cookie } = (await checkQrStatus(key)).data;
          if (code == 803) {
            saveCookie(cookie);
            close();
          } else if (code == 800) {
            recover();
          }
        }, 1500);
      }
    }
  };

  const recover = () => {
    setIsLoaded(false);
    setImg("");
    if (timer) {
      clearInterval(timer);
    }
  };

  useEffect(() => {
    create();
    return recover;
  }, []);

  return (
    <Skeleton isLoaded={isLoaded} className="mx-auto h-48 w-48 rounded-lg">
      <img src={img} alt="" className="h-full w-full" />
    </Skeleton>
  );
});
