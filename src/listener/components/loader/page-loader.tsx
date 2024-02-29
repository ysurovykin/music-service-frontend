import { Spin } from "antd";
import React from "react";

export function PageLoaderComponent() {

  return (
    <div className="page-loader">
      <Spin size="large"/>
    </div>
  );
}