import { Resource, IResource } from '../models/resources/index';

class ResourceService {
  async createResource(resourceData: IResource): Promise<IResource> {
    const resource = new Resource(resourceData);
    await resource.save();
    return resource;
  }

  async listResources(page: number, limit: number, category?: string, name?: string): Promise<{ resources: IResource[], total: number }> {
    const filter: any = {};
    if (category) filter.category = category;
    if (name) filter.name = { $regex: name, $options: 'i' };

    const resources = await Resource.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Resource.countDocuments(filter);

    return { resources, total };
  }

  async getResourceDetails(id: string): Promise<IResource | null> {
    return await Resource.findById(id);
  }

  async updateResource(id: string, updateData: Partial<IResource>): Promise<IResource | null> {
    return await Resource.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  async deleteResource(id: string): Promise<IResource | null> {
    return await Resource.findByIdAndDelete(id);
  }
}

export const resourceService = new ResourceService();