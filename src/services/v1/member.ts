import { Member, MemberAttrs } from "../../schema/v1/member.model";

class MemberService {
    static async Create(attrs: MemberAttrs) {
        const newMember = Member.build({
            community: attrs.community,
            user: attrs.user,
            role: attrs.role,
        });

        await newMember.save();
        return newMember;
    }
    static async GetCount(filter: Record<string, string | number>) {
        return await Member.countDocuments(filter);
    }
}

export default MemberService;
