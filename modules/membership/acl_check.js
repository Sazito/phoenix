import { getRole, getRoleConfigs } from "../../code/consts/acl/roles";

const hasPermission = (permissions, roleConfigs) => {
  return permissions.find(permission => {
    return (roleConfigs.permissions || []).indexOf(permission) >= 0;
  });
};

const aclCheck = ({ permissions, user }) => {
  const roleName = getRole({ user });
  const roleConfigs = getRoleConfigs(roleName);
  let hasAccess = false;
  if (!permissions || permissions.length === 0) {
    hasAccess = true;
  } else {
    if (
      permissions &&
      "permissions" in roleConfigs &&
      !!hasPermission(permissions, roleConfigs)
    ) {
      hasAccess = true;
    } else {
      hasAccess = false;
    }
  }
  return {
    hasAccess,
    roleConfigs
  };
};

export default aclCheck;
