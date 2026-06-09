import { Input, Button, message, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useWorkspaceUpdate } from '../model/useWorkspaceUpdate';
import { getErrorMessage } from '@/shared/utils/errorHandler';

const { TextArea } = Input;

export interface WorkspaceUpdateFormProps {
  workspaceId: string;
  initialName: string;
  initialDescription?: string | null;
}

export function WorkspaceUpdateForm({
  workspaceId,
  initialName,
  initialDescription,
}: WorkspaceUpdateFormProps) {
  const {
    newName,
    setNewName,
    newDescription,
    setNewDescription,
    isUpdating,
    handleUpdate,
  } = useWorkspaceUpdate(workspaceId, initialName, initialDescription);

  const onSubmit = async () => {
    try {
      await handleUpdate();
      message.success(`Workspace updated successfully!`);
    } catch (err: unknown) {
      message.error(getErrorMessage(err, 'Failed to update workspace.'));
    }
  };

  return (
    <Form
      layout="vertical"
      requiredMark={false}
      onFinish={onSubmit}
      className="w-full"
    >
      <Form.Item
        label={
          <span className="text-sm font-medium text-gray-8">
            Workspace name
          </span>
        }
      >
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter workspace name"
          size="large"
          className="bg-slate-50 border-transparent hover:border-blue-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl h-12 transition-all"
          disabled={isUpdating}
        />
      </Form.Item>

      <Form.Item
        label={
          <span className="text-sm font-medium text-gray-8">
            Workspace description
          </span>
        }
      >
        <TextArea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter a brief description for this workspace"
          size="large"
          rows={4}
          className="bg-slate-50 border-transparent hover:border-blue-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl resize-none py-3 transition-all"
          disabled={isUpdating}
        />
      </Form.Item>

      <div className="flex justify-end mt-2">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isUpdating}
          className="h-12 px-8 rounded-xl shadow-sm bg-blue-600 hover:bg-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          Save changes
        </Button>
      </div>
    </Form>
  );
}
