import mongoose from 'mongoose';

// Define an interface for the Resource
export interface IResource {
  name: string;
  description?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create a Mongoose Schema
const ResourceSchema = new mongoose.Schema<IResource>({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  category: { 
    type: String, 
    trim: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Create and export the model
export const Resource = mongoose.model<IResource>('Resource', ResourceSchema);