// ═══════════════════════════════════════════════════════
// entities/content-model — Public API (DUMB LAYER)
// Types + Passive UI only. No hooks, no API, no logic.
// ═══════════════════════════════════════════════════════

// Domain types
export type {
  FieldType,
  ContentField,
  ContentModel,
  CreateContentModelInput,
} from './model/content-model.types';

// Passive UI components (no useNavigate, no business logic)
export { ContentModelCard } from './ui/ContentModelCard';
export { ContentModelGrid } from './ui/ContentModelGrid';
export { ModelIdentityForm } from './ui/ModelIdentityForm';
export { JSONSchemaPreview } from './ui/JSONSchemaPreview';
export { ModelMetadataSidebar } from './ui/ModelMetadataSidebar';
export { FieldsTable } from './ui/FieldsTable';

// Visual Modeler Entity Components
export { ModelNode } from './ui/ModelNode';
export type { ModelNodeData } from './ui/ModelNode';
