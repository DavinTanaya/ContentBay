import { memo } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Collapse, Tag, Typography } from 'antd';
import { DatabaseOutlined, FieldStringOutlined } from '@ant-design/icons';
import type { ContentField } from '../model/types';

const { Text } = Typography;

export type ModelNodeData = Node<
  {
    label: string;
    fields: ContentField[];
  },
  'modelNode'
>;

export const ModelNode = memo(({ data }: NodeProps<ModelNodeData>) => {
  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 min-w-[280px] overflow-hidden group hover:border-blue-400 transition-all">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-blue-500 !border-2 !border-white"
      />

      <Collapse
        defaultActiveKey={['1']}
        expandIconPosition="end"
        bordered={false}
        className="bg-transparent"
        items={[
          {
            key: '1',
            label: (
              <div className="flex items-center gap-3">
                <DatabaseOutlined className="text-blue-500" />
                <Text strong className="text-sm">
                  {data.label}
                </Text>
              </div>
            ),
            extra: (
              <Text type="secondary" className="text-[10px] mr-2">
                {data.fields?.length || 0}
              </Text>
            ),
            children: (
              <div className="flex flex-col gap-1.5 pb-1">
                {data.fields && data.fields.length > 0 ? (
                  data.fields.map((field: ContentField, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-none"
                    >
                      <div className="flex items-center gap-2">
                        <FieldStringOutlined className="text-gray-300 text-[10px]" />
                        <Text className="text-[12px] font-medium text-gray-600">
                          {field.name}
                        </Text>
                      </div>
                      <Tag
                        color="blue"
                        bordered={false}
                        className="text-[9px] m-0 px-1.5 py-0 leading-normal font-bold uppercase tracking-tighter"
                      >
                        {field.type}
                      </Tag>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center">
                    <Text type="secondary" italic className="text-[11px]">
                      No fields defined
                    </Text>
                  </div>
                )}
              </div>
            ),
          },
        ]}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !bg-blue-500 !border-2 !border-white"
      />
    </div>
  );
});
