import React, { useState } from 'react';
import { Modal, Button } from 'antd';

export type TabKey = 'settings' | 'validation' | 'appearance';

interface FieldModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  fieldTypeLabel: string;
  children: (activeTab: TabKey) => React.ReactNode;
  availableTabs?: TabKey[];
}

export function FieldModalLayout({
  isOpen,
  onClose,
  onConfirm,
  title,
  fieldTypeLabel,
  children,
  availableTabs = ['settings', 'validation', 'appearance'],
}: FieldModalLayoutProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('settings');

  const LABELS: Record<TabKey, string> = {
    settings: 'Settings',
    validation: 'Validation',
    appearance: 'Appearance',
  };

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={860}
      centered
      styles={{ body: { padding: 0 } }}
    >
      <div className="flex flex-col bg-white" style={{ minHeight: 560 }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-gray-900 font-poppins">{title || 'New Field'}</span>
            <span className="text-sm text-gray-400 font-poppins">{fieldTypeLabel}</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
          {/* Sidebar Tabs */}
          <div className="flex-shrink-0 border-r border-gray-200 py-2" style={{ width: 220 }}>
            {availableTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-5 py-2.5 text-sm transition-colors font-poppins
                  ${
                    activeTab === tab
                      ? 'bg-blue-50 text-gray-800 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 font-medium'
                  }`}
                style={{ outline: 'none', border: 'none' }}
              >
                {LABELS[tab]}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto px-10 py-8" style={{ maxHeight: 520 }}>
            {children(activeTab)}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <Button size="middle" onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button size="middle" onClick={onConfirm} type="primary">
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}
