import React from "react";
import isNill from "lodash/isNil";

const WithLayout = ({ children, layout: Layout }) => {
  if (isNill(Layout)) return children;
  return <Layout>{children}</Layout>;
};

export default WithLayout;
