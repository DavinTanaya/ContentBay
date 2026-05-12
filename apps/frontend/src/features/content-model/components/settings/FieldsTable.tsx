import type { FC } from 'react';
import { Table, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import type { ContentField } from '../../content-model.type';

interface FieldsTableProps {
  data: ContentField[];
  onEditField: (field: ContentField) => void;
  onAddNewField: () => void;
}

export const FieldsTable: FC<FieldsTableProps> = ({
  data,
  onEditField,
  onAddNewField,
}) => {
  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-xs">
            T
          </div>
          <span className="font-bold text-gray-900">{text}</span>
        </div>
      ),
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => (
        <span className="text-gray-400 font-medium text-sm">{text}</span>
      ),
    },
    {
      title: 'LOCALIZED',
      dataIndex: 'localized',
      key: 'localized',
      render: (val: boolean) =>
        val ? (
          <div className="w-5 h-5 rounded-full border-2 border-[#2563EB] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></div>
          </div>
        ) : null,
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_: any, record: any) => (
        <div className="flex items-center gap-4">
          <Button
            type="link"
            className="text-[#2563EB] font-bold p-0"
            onClick={() => onEditField(record)}
          >
            Edit
          </Button>
          <Button className="text-gray-300 hover:text-gray-600 transition-colors">
            <MoreOutlined className="text-lg rotate-90" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden h-fit">
      <div className="px-10 py-8 flex items-center justify-between border-b border-gray-50">
        <h2 className="text-base font-bold text-gray-900 tracking-tight">
          Content Fields
        </h2>
        <Button
          type="link"
          className="text-[#2563EB] font-bold p-0"
          onClick={onAddNewField}
        >
          + Add new fields
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        className="clean-table"
      />
    </div>
  );
};
