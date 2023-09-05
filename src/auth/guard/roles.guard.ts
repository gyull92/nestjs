import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import Role from '../../entities/enum/user.role.enum';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const req = context.switchToHttp().getRequest();
      const user = req.user;
      const userRoleLevel = {
        User: 1,
        Seller: 2,
        Admin: 3,
      };
      return userRoleLevel[role] <= userRoleLevel[user.role];
    }
  }
  return mixin(RoleGuardMixin);
};

export default RoleGuard;
// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.get<string[]>(Roles, context.getHandler());
//     if (!roles) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
//     return matchRoles(roles, user.roles);
//   }
// }
