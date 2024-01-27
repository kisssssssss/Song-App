import { memo } from "react";
import Icon from "assets/icon";

export default memo<{ status: boolean; click: () => void }>(({ status, click }) => {
  return (
    <button className="focus:outline-none" type="button" onClick={click}>
      {status ? (
        <Icon name="eyeSlash" className="pointer-events-none text-2xl text-default-400" />
      ) : (
        <Icon name="eye" className="pointer-events-none text-2xl text-default-400" />
      )}
    </button>
  );
});
