import { useState } from 'react';
import { message, Modal } from 'antd';
import { deleteContentApi } from '@/entities/content';
import { getErrorMessage } from '@/shared/utils/errorHandler';

export function useDeleteEntry() {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteEntry = async (
    id: string,
    workspaceId: string,
    modelId?: string,
    onSuccess?: () => void,
  ) => {
    try {
      setIsDeleting(true);
      await deleteContentApi(id, workspaceId, modelId);
      message.success('Content entry deleted successfully');
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      message.error(getErrorMessage(err, 'Failed to delete content'));
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmDelete = (
    id: string,
    workspaceId: string,
    modelId?: string,
    onSuccess?: () => void,
  ) => {
    Modal.confirm({
      title: 'Delete this entry?',
      content:
        'Are you sure you want to delete this content entry? This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      centered: true,
      onOk: () => deleteEntry(id, workspaceId, modelId, onSuccess),
    });
  };

  return { deleteEntry, confirmDelete, isDeleting };
}
