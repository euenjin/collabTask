// backend/src/models/Task.js
import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

// Export as default so `import Task from ...` works
export default model('Task', taskSchema);
