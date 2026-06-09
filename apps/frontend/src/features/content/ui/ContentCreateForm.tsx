import React, { useEffect } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Switch,
  DatePicker,
  Button,
  Tag,
  Spin,
  Result,
  message,
  Typography,
} from 'antd';
import { ArrowLeftOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useActiveWorkspaceId } from '@/entities/workspace';
import {
  useGetContentApi,
  createContentApi,
  updateContentApi,
} from '@entities/content';
import {
  useGetContentModelsApi,
  RenderModelIcon,
} from '@entities/content-model';
import dayjs from 'dayjs';
import { getErrorMessage } from '@/shared/utils/errorHandler';

const { Paragraph } = Typography;

export const ContentCreateForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeWorkspaceId = useActiveWorkspaceId();
  const [form] = Form.useForm();

  const modelId = searchParams.get('modelId');
  const entryId = searchParams.get('entryId');

  // 1. Fetch Content Models to find fields
  const { data: modelsData, loading: modelsLoading } = useGetContentModelsApi();
  const allModels = modelsData?.getContentModels || [];

  const activeModel = React.useMemo(() => {
    return allModels.find((m) => m.id === modelId);
  }, [allModels, modelId]);

  // 2. Fetch Content if in Edit Mode
  const { data: entryData, loading: entryLoading } = useGetContentApi(
    entryId || '',
  );
  const existingEntry = entryData?.getContent;

  // 3. Action Loading States
  const [createLoading, setCreateLoading] = React.useState(false);
  const [updateLoading, setUpdateLoading] = React.useState(false);

  // Set form values on edit mode
  useEffect(() => {
    if (existingEntry && activeModel) {
      const formValues: Record<string, any> = {};

      // Parse payload
      const payload = existingEntry.data || {};

      activeModel.fields.forEach((field: any) => {
        const val = payload[field.apiId];
        if (field.type.toUpperCase() === 'DATE' && val) {
          formValues[field.apiId] = dayjs(val as string);
        } else {
          formValues[field.apiId] = val;
        }
      });

      form.setFieldsValue(formValues);
    } else {
      form.resetFields();
    }
  }, [existingEntry, activeModel, form]);

  const handleFinish = async (values: any, status: 'draft' | 'published') => {
    // Process form values (e.g. dates to ISO/string strings)
    const payload: Record<string, any> = {};

    if (!activeModel) return;

    activeModel.fields.forEach((field: any) => {
      const rawVal = values[field.apiId];
      if (field.type.toUpperCase() === 'DATE' && rawVal) {
        payload[field.apiId] = rawVal.toISOString
          ? rawVal.toISOString()
          : rawVal;
      } else {
        payload[field.apiId] = rawVal;
      }
    });

    try {
      if (entryId) {
        setUpdateLoading(true);
        // Edit Mode
        await updateContentApi(
          entryId,
          {
            data: payload,
            status,
          },
          activeWorkspaceId,
          modelId || undefined,
        );
        message.success('Content entry updated successfully!');
      } else {
        setCreateLoading(true);
        // Creation Mode
        await createContentApi(
          {
            input: {
              workspaceId: activeWorkspaceId,
              contentModelId: modelId || '',
              data: payload,
              status,
            },
          },
          activeWorkspaceId,
          modelId || undefined,
        );
        message.success('Content entry created successfully!');
      }
      navigate(`/workspace/${activeWorkspaceId}/content`);
    } catch (err: unknown) {
      message.error(getErrorMessage(err, 'Failed to save content entry'));
    } finally {
      if (entryId) setUpdateLoading(false);
      else setCreateLoading(false);
    }
  };

  const renderFieldInput = (field: any) => {
    const type = field.type.toUpperCase();
    switch (type) {
      case 'TEXT':
      case 'SHORT TEXT':
      case 'STRING':
        return (
          <Input
            size="large"
            placeholder={`Masukkan ${field.name}...`}
            className="rounded-md bg-white border-gray-200 hover:border-blue-500 focus:border-blue-500 font-poppins"
          />
        );
      case 'TEXTAREA':
      case 'LONG TEXT':
      case 'RICH TEXT':
      case 'RICHTEXT':
      case 'RICH-TEXT':
        return (
          <Input.TextArea
            size="large"
            placeholder={`Masukkan ${field.name}...`}
            rows={5}
            className="rounded-md bg-white border-gray-200 hover:border-blue-500 focus:border-blue-500 font-poppins"
          />
        );
      case 'NUMBER':
      case 'INTEGER':
      case 'FLOAT':
        return (
          <InputNumber
            size="large"
            placeholder="0"
            className="w-full rounded-md bg-white border-gray-200 font-poppins"
          />
        );
      case 'BOOLEAN':
      case 'SWITCH':
        return <Switch className="bg-gray-300" />;
      case 'DATE':
      case 'DATETIME':
        return (
          <DatePicker
            size="large"
            className="w-full rounded-md bg-white border-gray-200 font-poppins"
            suffixIcon={<CalendarOutlined />}
          />
        );
      default:
        return (
          <Input
            size="large"
            placeholder={`Masukkan ${field.name}...`}
            className="rounded-md bg-white border-gray-200 hover:border-blue-500 focus:border-blue-500 font-poppins"
          />
        );
    }
  };

  if (modelsLoading || (entryId && entryLoading)) {
    return (
      <div className="flex justify-center items-center h-[60vh] bg-white">
        <Spin size="large" />
      </div>
    );
  }

  if (!modelId || !activeModel) {
    return (
      <div className="p-12 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto my-12">
        <Result
          status="warning"
          title="Content Model Tidak Ditemukan"
          subTitle="Silakan pilih jenis content model yang valid dari halaman daftar konten."
          extra={
            <Button
              type="primary"
              onClick={() =>
                navigate(`/workspace/${activeWorkspaceId}/content`)
              }
              className="rounded-xl"
            >
              Kembali ke Daftar Konten
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-[calc(100vh-72px)] p-12">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto mb-10">
        <div className="flex items-center gap-2 mb-8">
          <Button
            type="text"
            shape="circle"
            className="text-gray-8 hover:text-black hover:bg-gray-2 -ml-2"
            onClick={() => navigate(`/workspace/${activeWorkspaceId}/content`)}
            icon={<ArrowLeftOutlined style={{ fontSize: '20px' }} />}
          />

          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900 m-0 leading-8">
              {entryId ? 'Edit Entry' : 'Create Entry'}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* Main Form Area */}
        <div className="flex-[2] space-y-8">
          <div className="relative rounded-[32px] bg-white ring-1 ring-slate-200 shadow-none hover:ring-blue-200 hover:shadow-[0_12px_32px_rgba(0,100,255,0.06)] transition-all duration-500 p-12">
            <Form
              form={form}
              layout="vertical"
              className="space-y-8"
              requiredMark={false}
            >
              {activeModel.fields.length === 0 ? (
                <div className="py-12 text-center">
                  <Result
                    status="info"
                    title="Model Belum Memiliki Field"
                    subTitle="Silakan tambahkan field terlebih dahulu di Content Model Settings."
                    extra={
                      <Button
                        type="default"
                        onClick={() =>
                          navigate(
                            `/workspace/${activeWorkspaceId}/content-model/${activeModel.id}`,
                          )
                        }
                        className="rounded-xl"
                      >
                        Kelola Content Model
                      </Button>
                    }
                  />
                </div>
              ) : (
                activeModel.fields.map((field: any) => (
                  <Form.Item
                    key={field.apiId}
                    name={field.apiId}
                    label={
                      <span className="text-xs font-bold text-gray-800 uppercase tracking-wider font-poppins">
                        {field.required && (
                          <span className="text-red-500 mr-1">*</span>
                        )}
                        {field.name}
                      </span>
                    }
                    valuePropName={
                      field.type.toUpperCase() === 'BOOLEAN'
                        ? 'checked'
                        : 'value'
                    }
                    rules={[
                      {
                        required: field.required,
                        message: `${field.name} wajib diisi!`,
                      },
                    ]}
                    extra={
                      field.description && (
                        <span className="text-[11px] text-gray-400 mt-1 font-poppins">
                          {field.description}
                        </span>
                      )
                    }
                  >
                    {renderFieldInput(field)}
                  </Form.Item>
                ))
              )}
            </Form>
          </div>
        </div>

        {/* Sidebar Info Area */}
        <div className="flex-grow lg:max-w-[360px] shrink-0">
          <div className="relative rounded-[32px] bg-white ring-1 ring-slate-200 shadow-none hover:ring-blue-200 hover:shadow-[0_12px_32px_rgba(0,100,255,0.06)] transition-all duration-500 p-8 space-y-10">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 font-poppins">
                Actions
              </h3>
              <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-4">
                <span className="text-gray-500 font-medium text-sm">
                  Status Konten
                </span>
                <Tag
                  color={
                    (existingEntry?.status || 'draft') === 'published'
                      ? '#E6FFED'
                      : '#FFF8C5'
                  }
                  className="border-none font-bold text-xs rounded-lg px-4 py-1 m-0 capitalize"
                  style={{
                    color:
                      (existingEntry?.status || 'draft') === 'published'
                        ? '#1A7F37'
                        : '#9A6700',
                  }}
                >
                  {existingEntry?.status || 'draft'}
                </Tag>
              </div>
              <div className="space-y-3">
                <Button
                  type="primary"
                  block
                  loading={createLoading || updateLoading}
                  onClick={() =>
                    form
                      .validateFields()
                      .then((values) => handleFinish(values, 'published'))
                  }
                  className="h-12 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm border-none shadow-sm shadow-blue-500/20 transition-all font-poppins"
                >
                  Publish Content
                </Button>
                <Button
                  block
                  loading={createLoading || updateLoading}
                  onClick={() =>
                    form
                      .validateFields()
                      .then((values) => handleFinish(values, 'draft'))
                  }
                  className="h-12 border-slate-200 hover:border-slate-300 rounded-xl font-bold text-sm text-slate-700 bg-slate-50 hover:bg-slate-100 transition-all font-poppins"
                >
                  Save as Draft
                </Button>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 font-poppins">
                Model Info
              </h3>
              <div className="space-y-6 text-sm">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Content Model Name
                  </p>
                  <p className="text-sm font-bold text-gray-900 font-poppins">
                    {activeModel.name}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Description
                  </p>
                  <p className="text-sm font-bold text-gray-700 leading-relaxed font-poppins">
                    {activeModel.description || 'Tidak ada deskripsi.'}
                  </p>
                </div>
                {entryId && (
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Entry ID
                    </p>
                    <p className="text-xs font-mono text-gray-500 select-all">
                      {entryId}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    API Identifier
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-blue-600 font-mono">
                      {activeModel.apiId}
                    </span>
                    <Paragraph
                      copyable={{
                        text: activeModel.apiId,
                        tooltips: ['Copy API ID', 'Copied!'],
                        onCopy: () =>
                          message.success('API ID copied to clipboard'),
                      }}
                      className="m-0 text-gray-400 hover:text-blue-600 flex items-center [&>div]:m-0"
                      aria-label="Copy API ID"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
