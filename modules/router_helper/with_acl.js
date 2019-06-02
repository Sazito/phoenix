import React from "react";
import { Redirect } from "react-router-dom";
import aclCheck from "../membership/acl_check";
import UserContext from "../user_context";

const WithACL = ({ children, permissions, onReject = "defaultRoute" }) => {
  return (
    <UserContext.Consumer>
      {({ user }) => {
        const acl = aclCheck({ permissions, user });
        if (acl.hasAccess) return children;
        else
          return (
            <Redirect
              to={{
                pathname:
                  acl.roleConfigs[onReject] || acl.roleConfigs["defaultRoute"]
              }}
            />
          );
      }}
    </UserContext.Consumer>
  );
};

export default WithACL;
