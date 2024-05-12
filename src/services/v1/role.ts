import { CommityAttrs, Community } from "../../schema/v1/community";
import { Role, RoleAttrs } from "../../schema/v1/role.model";

class RoleService {
    static async GetAdmin() {
        return await Role.findOne({ name: "Community Admin" });
    }
    static async CreateAdmin() {
        const newRole = Role.build({ name: "Community Admin", scopes: [] });
        await newRole.save();
        return newRole;
    }
}

export default RoleService;
