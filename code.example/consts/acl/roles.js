import * as permissions from "./permissions";

export const ADMIN = "admin";
export const AUTHENTICATED = "authenticated";
export const GUEST = "guest";

const roleConfigs = {
  [ADMIN]: {
    permissions: [permissions.VIEW_ADMIN],
    defaultRoute: "/admin"
  },
  [AUTHENTICATED]: {
    permissions: [permissions.VIEW_DASHBOARD],
    defaultRoute: "/dashboard",
    accessDeniedRoute: "/403"
  },
  [GUEST]: {
    permissions: [permissions.VIEW_LOGIN, permissions.VIEW_REGISTER],
    defaultRoute: "/login"
  }
};

export const getRoleConfigs = roleName =>
  roleName in roleConfigs && roleConfigs[roleName];

export const getRole = ({ user }) => {
  let roleName = GUEST;
  if (user) {
    roleName = AUTHENTICATED;
  }

  return roleName;
};
