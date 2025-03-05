import { Request, Response } from 'express';
import { resourceService } from '../services/resource.service';
import { IResource } from '../models/resources/index';

export class ResourceController {
  // Create a new resource
  async createResource(req: Request, res: Response): Promise<void> {
    try {
      const resourceData: IResource = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const resource = await resourceService.createResource(resourceData);

      res.status(201).json({
        message: 'Resource created successfully',
        data: resource
      });
    } catch (error) {
      res.status(400).json({
        message: 'Error creating resource',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // List resources with filters
  async listResources(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, category, name } = req.query;

      const { resources, total } = await resourceService.listResources(
        Number(page),
        Number(limit),
        category as string,
        name as string
      );

      res.status(200).json({
        message: 'Resources retrieved successfully',
        data: resources,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total
        }
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving resources',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get resource details
  async getResourceDetails(req: Request, res: Response): Promise<void> {
    try {
      const resource = await resourceService.getResourceDetails(req.params.id);

      if (!resource) {
        res.status(404).json({ message: 'Resource not found' });
        return;
      }

      res.status(200).json({
        message: 'Resource details retrieved',
        data: resource
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving resource details',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Update resource
  async updateResource(req: Request, res: Response): Promise<void> {
    try {
      const updateData = {
        ...req.body,
        updatedAt: new Date()
      };

      const resource = await resourceService.updateResource(req.params.id, updateData);

      if (!resource) {
        res.status(404).json({ message: 'Resource not found' });
        return;
      }

      res.status(200).json({
        message: 'Resource updated successfully',
        data: resource
      });
    } catch (error) {
      res.status(400).json({
        message: 'Error updating resource',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Delete resource
  async deleteResource(req: Request, res: Response): Promise<void> {
    try {
      const resource = await resourceService.deleteResource(req.params.id);

      if (!resource) {
        res.status(404).json({ message: 'Resource not found' });
        return;
      }

      res.status(200).json({
        message: 'Resource deleted successfully',
        data: resource
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting resource',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}