import React, { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ModelNode } from '@entities/content-model';
import type { ContentModel } from '@entities/content-model';

interface VisualModelerCanvasProps {
  models: ContentModel[];
}

const nodeTypes = {
  modelNode: ModelNode,
};

export const VisualModelerCanvas: React.FC<VisualModelerCanvasProps> = ({
  models,
}) => {
  // Logic merakit Entity (ContentModel) menjadi Node visual (ModelNode)
  const { nodes, edges } = useMemo(() => {
    const initialNodes: Node[] = models.map((model, index) => ({
      id: model.id,
      type: 'modelNode',
      position: { x: index * 350, y: 100 },
      data: {
        label: model.name,
        fields: model.fields || [],
      },
    }));

    const initialEdges: Edge[] = [];

    return { nodes: initialNodes, edges: initialEdges };
  }, [models]);

  return (
    <div className="w-full h-full bg-[#F9FAFB]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        colorMode="light"
        className="animate-in fade-in duration-1000"
      >
        <Background color="#E5E7EB" gap={20} size={1} />
        <Controls
          showInteractive={false}
          className="bg-white border-gray-100 rounded-xl shadow-lg"
        />
        <Panel
          position="bottom-right"
          className="bg-white/80 backdrop-blur p-4 rounded-2xl border border-gray-100 shadow-sm m-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Visual Engine Active
            </p>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};
