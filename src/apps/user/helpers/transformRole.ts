import { RoleName } from 'src/apps/role/enum/roles.enum';

export const visibleUserByRoles = (role: RoleName): string[] => {
  switch (role) {
    case RoleName.MASTER:
      return [
        RoleName.DIRECTOR,
        RoleName.HEALTH_STAFF,
        RoleName.NAVIGATOR,
        RoleName.STAFF,
        RoleName.MASTER,
      ];
    case RoleName.DIRECTOR:
      return [RoleName.HEALTH_STAFF, RoleName.NAVIGATOR, RoleName.STAFF];
    case RoleName.HEALTH_STAFF:
      return [RoleName.NAVIGATOR, RoleName.STAFF];
    default:
      return [RoleName.STAFF];
  }
};
