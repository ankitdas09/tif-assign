import { CommityAttrs, Community } from "../../schema/v1/community";

class CommunityService {
    static async FindById(id: string) {
        return await Community.findById(id);
    }
    static async Create(attrs: CommityAttrs) {
        const newCommunity = Community.build({
            name: attrs.name,
            slug: attrs.slug,
            owner: attrs.owner,
        });
        await newCommunity.save();

        return newCommunity;
    }
    static async GetCount() {
        return await Community.countDocuments();
    }
    static async GetPage(options: Record<string, string | number>, page: number) {
        const communities = await Community.find(options)
            .limit(10)
            .skip((page - 1) * 10)
            .sort({ createdAt: -1 })
            .populate("owner", "-createdAt -email");
        return communities;
    }
    static async GetById(id: string) {
        return await Community.findById(id);
    }
}

export default CommunityService;
