import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import aclCheck from "../membership/acl_check";
import UserContext from "../user_context";

const WithACL = ({ children, permissions, onReject = "defaultRoute" }) => {
  const { user } = useContext(UserContext);
  const acl = aclCheck({ permissions, user });

  if (acl.hasAccess) return children;
  else
    return (
      <Redirect
        to={{
          pathname: acl.roleConfigs[onReject] || acl.roleConfigs["defaultRoute"]
        }}
      />
    );
};

export default WithACL;
