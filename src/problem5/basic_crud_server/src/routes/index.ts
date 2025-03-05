import express from 'express';
import { ResourceController } from '../controllers/index';

export class ResourceRoutes {
  router = express.Router();
  resourceController = new ResourceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Create a new resource
    this.router.post('/', this.resourceController.createResource);

    // List resources
    this.router.get('/', this.resourceController.listResources);

    // Get resource details
    this.router.get('/:id', this.resourceController.getResourceDetails);

    // Update resource
    this.router.put('/:id', this.resourceController.updateResource);

    // Delete resource
    this.router.delete('/:id', this.resourceController.deleteResource);
  }
}