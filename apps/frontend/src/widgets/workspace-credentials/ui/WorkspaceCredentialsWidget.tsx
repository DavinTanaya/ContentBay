import { Button } from 'antd';
import {
  PlusOutlined,
  SyncOutlined,
  DeleteOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { useGetApiTokensApi } from '@/entities/api-token/hooks/useApiTokenQueries';
import {
  useGenerateApiToken,
  GenerateApiTokenModal,
  TokenDisplayModal,
} from '@/features/api-token-generate';
import { useApiTokenActions } from '@/features/api-token-actions';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function WorkspaceCredentialsWidget({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const { data, loading: fetchingTokens } = useGetApiTokensApi(workspaceId);
  const tokens = data?.getApiTokens || [];

  // Find the single active token (assuming only one active token per workspace makes sense)
  const activeToken = tokens.find((t: any) => t.status !== 'REVOKED');

  const {
    isModalOpen,
    openModal,
    closeModal,
    handleGenerate,
    loading: generating,
    generatedToken,
    closeTokenDisplay,
  } = useGenerateApiToken(workspaceId);

  const {
    handleRevoke,
    handleRegenerate,
    revoking,
    regenerating,
    regeneratedToken,
    closeRegenerateDisplay,
  } = useApiTokenActions();

  return (
    <div className="bg-white rounded-[24px] ring-1 ring-slate-200 shadow-sm overflow-hidden mb-8">
      <div className="p-6 md:p-8 border-b border-gray-2/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-poppins text-xl font-bold text-gray-12 m-0 tracking-tight">
            API Credential
          </h2>
          <p className="text-[14px] text-gray-6 mt-1.5 m-0 max-w-lg">
            Manage the primary API key used to authenticate external
            applications and SDKs to your ContentBay workspace.
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {fetchingTokens ? (
          <div className="h-24 flex items-center justify-center">
            <span className="text-gray-5">Loading credential...</span>
          </div>
        ) : activeToken ? (
          <div className="flex flex-col md:flex-row items-center justify-between p-6 ring-1 ring-slate-200 rounded-[20px] bg-white hover:ring-blue-200 hover:shadow-[0_8px_24px_rgba(0,100,255,0.06)] transition-all duration-300">
            <div className="flex items-center gap-5 w-full md:w-auto mb-5 md:mb-0">
              <div className="w-[52px] h-[52px] rounded-2xl bg-blue-50/80 ring-1 ring-blue-100 flex items-center justify-center text-blue-6 shadow-sm shrink-0">
                <KeyOutlined className="text-[22px]" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-[16px] font-semibold text-gray-10 m-0">
                    {activeToken.name}
                  </h3>
                  <span className="px-2 py-0.5 bg-green-50 text-green-7 text-[11px] font-bold rounded-full ring-1 ring-green-200/50">
                    ACTIVE
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-1">
                  <code className="text-[13px] font-mono text-gray-8 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-2">
                    {activeToken.tokenPrefix}••••••••••••••••••••
                  </code>
                  <span className="text-[12px] text-gray-5">
                    Created {dayjs(Number(activeToken.createdAt)).fromNow()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <Button
                icon={<SyncOutlined />}
                onClick={() =>
                  handleRegenerate(activeToken.id, activeToken.name)
                }
                loading={regenerating}
                className="font-medium h-[38px] px-4"
              >
                Regenerate Key
              </Button>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRevoke(activeToken.id, activeToken.name)}
                loading={revoking}
                className="font-medium h-[38px]"
              >
                Revoke
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 px-6 rounded-[24px] border-2 border-dashed border-gray-3 bg-gray-50/50">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center ring-1 ring-slate-200 mx-auto mb-5 shadow-sm">
              <KeyOutlined className="text-gray-5 text-2xl" />
            </div>
            <h3 className="font-poppins text-lg font-bold text-gray-10 mb-2">
              No API Key Configured
            </h3>
            <p className="text-sm text-gray-6 mb-7 max-w-sm mx-auto">
              Generate an API key to securely connect external applications,
              websites, and SDKs to your ContentBay workspace.
            </p>
            <Button
              type="primary"
              variant="solid"
              color="geekblue"
              icon={<PlusOutlined />}
              onClick={openModal}
              loading={generating}
              className="h-[42px] px-6 font-semibold"
            >
              Generate API Key
            </Button>
          </div>
        )}
      </div>

      <GenerateApiTokenModal
        isOpen={isModalOpen}
        onCancel={closeModal}
        onGenerate={handleGenerate}
        loading={generating}
      />

      <TokenDisplayModal token={generatedToken} onClose={closeTokenDisplay} />

      <TokenDisplayModal
        token={regeneratedToken}
        onClose={closeRegenerateDisplay}
      />
    </div>
  );
}
