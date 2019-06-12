import React from "react";
import isNil from "lodash.isnil";

const WithLayout = ({ children, layout: Layout }) => {
  if (isNil(Layout)) return children;
  return <Layout>{children}</Layout>;
};

export default WithLayout;
