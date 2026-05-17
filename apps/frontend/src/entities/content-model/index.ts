// ═══════════════════════════════════════════════════════
// entities/content-model — Public API
// Types, Mutations, Queries, and Passive UI.
// ═══════════════════════════════════════════════════════

// Domain types
export type {
  FieldType,
  ContentField,
  ContentModel,
  CreateContentModelInput,
} from './model/content-model.types';

// API: Mutations & Queries
export * from './api/content-model.queries';
export * from './api/content-model.mutations';

// Passive UI components
export { ContentModelCard } from './ui/ContentModelCard';
export { ContentModelGrid } from './ui/ContentModelGrid';
export { JSONSchemaPreview } from './ui/JSONSchemaPreview';
export { ModelMetadataSidebar } from './ui/ModelMetadataSidebar';
export { FieldsTable } from './ui/FieldsTable';

// Visual Modeler Entity Components
export { ModelNode } from './ui/ModelNode';
export type { ModelNodeData } from './ui/ModelNode';
