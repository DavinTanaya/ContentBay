import { Input } from 'antd';

const NAME_MAX = 50;
const APIID_MAX = 64;

const LockIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9ca3af"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

interface FieldIdentityFormProps {
  name: string;
  apiId: string;
  setApiId: (apiId: string) => void;
  onNameChange: (newName: string) => void;
}

export function FieldIdentityForm({
  name,
  apiId,
  setApiId,
  onNameChange,
}: FieldIdentityFormProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Name and field ID</h2>

      {/* Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Name{' '}
          <span className="text-gray-400 font-normal">(required)</span>
        </label>
        <Input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          maxLength={NAME_MAX}
          size="large"
          className="rounded-sm"
        />
        <div className="text-right text-xs text-gray-400 mt-1">
          {name.length} / {NAME_MAX}
        </div>
      </div>

      {/* Field ID */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Field ID{' '}
          <span className="text-gray-400 font-normal">(required)</span>
        </label>
        <Input
          value={apiId}
          onChange={(e) => setApiId(e.target.value)}
          maxLength={APIID_MAX}
          size="large"
          className="rounded-sm font-mono"
          suffix={<LockIcon />}
        />
        <div className="text-right text-xs text-gray-400 mt-1">
          {apiId.length} / {APIID_MAX}
        </div>
      </div>
    </div>
  );
}
