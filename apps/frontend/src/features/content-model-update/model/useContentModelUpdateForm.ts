import { Form } from 'antd';
import { useUpdateContentModel } from './useUpdateContentModel';
import type {
  ContentModelInitialValues,
  ContentModelFormValues,
} from './content-model-update.types';

export const useContentModelUpdateForm = (
  initialValues: ContentModelInitialValues,
) => {
  const [form] = Form.useForm<ContentModelFormValues>();
  const { updateIdentity, isUpdating } = useUpdateContentModel(
    initialValues.id,
  );

  const onFinish = (values: ContentModelFormValues) => {
    updateIdentity({
      name: values.name,
      description: values.description,
      apiId: initialValues.apiId,
      icon: values.icon,
    });
  };

  return {
    form,
    isUpdating,
    onFinish,
  };
};
