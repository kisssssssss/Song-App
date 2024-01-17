import React, { memo } from "react";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

const Songs = memo(() => {
  return (
    <Tabs aria-label="Options" fullWidth>
      <Tab key="photos" title="Photos"></Tab>
      <Tab key="music" title="Music"></Tab>
      <Tab key="videos" title="Videos"></Tab>
    </Tabs>
  );
});

export default Songs;
