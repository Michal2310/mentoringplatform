import { InferSubjects } from '@casl/ability';
import { PrismaAbility } from '@casl/prisma';
import { UserAbility } from '../auth/dto';
export declare enum Action {
    Manage = "manage",
    Create = "create",
    Read = "read",
    Update = "update",
    Delete = "delete"
}
declare type Subjects = InferSubjects<typeof UserAbility> | 'all';
export declare type AppAbility = PrismaAbility<[Action, Subjects]>;
export declare class AbilityFactory {
    createForUser(user: UserAbility): AppAbility;
}
export {};
