import { Input, Button, message } from 'antd';
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
    <div className="w-full flex flex-col gap-6">
      <div>
        <label className="block text-sm font-semibold text-gray-9 mb-2">
          Workspace name
        </label>
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter workspace name"
          size="large"
          prefix={<EditOutlined className="text-gray-7" />}
          className="border-gray-4 rounded-xl h-12"
          disabled={isUpdating}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-9 mb-2">
          Workspace description
        </label>
        <TextArea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter a brief description for this workspace"
          size="large"
          rows={4}
          className="border-gray-4 rounded-xl resize-none py-3"
          disabled={isUpdating}
        />
      </div>

      <div className="flex justify-end mt-2">
        <Button
          type="primary"
          variant="solid"
          color="geekblue"
          size="large"
          onClick={onSubmit}
          loading={isUpdating}
          className="h-12 px-6 rounded-xl shadow-sm"
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}
