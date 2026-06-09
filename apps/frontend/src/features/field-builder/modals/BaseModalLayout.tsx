import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { RenderFieldIcon, type FieldIcon } from '@entities/content-model';

export type TabKey = 'settings' | 'validation' | 'appearance';

interface BaseModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onConfirm: () => void;
  title: string;
  icon: FieldIcon;
  children: (activeTab: TabKey) => React.ReactNode;
  availableTabs?: TabKey[];
  isSubmitting?: boolean;
}

export function BaseModalLayout({
  isOpen,
  onClose,
  onBack,
  onConfirm,
  title,
  icon,
  children,
  availableTabs = ['settings', 'validation', 'appearance'],
  isSubmitting,
}: BaseModalLayoutProps) {
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
      width={900}
      centered
      className="field-builder-modal"
      styles={{ body: { padding: 0 } }}
    >
      <div className="flex flex-col h-[80vh] min-h-[600px] overflow-hidden bg-white">
        {/* Header */}
        <div className="p-6 border-b border-gray-4 shrink-0 flex items-center gap-4 bg-white z-10">
          <div className="w-10 h-10 rounded-xl bg-blue-1 text-blue-6 flex items-center justify-center text-lg shadow-sm">
            <RenderFieldIcon icon={icon} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-12 font-poppins">{title || 'New Field'}</h2>
            <p className="text-sm text-gray-6 font-poppins mb-0">Configure the properties for this field</p>
          </div>
        </div>

        {/* Dynamic Content Area with Sidebar */}
        <div className="flex-1 overflow-hidden flex">
          {/* Left Sidebar */}
          <div className="w-64 border-r border-gray-4 bg-gray-1 p-4 shrink-0 overflow-y-auto">
            <ul className="space-y-1">
              {availableTabs.map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-4 py-2.5 rounded-md text-sm transition-colors font-poppins outline-none border-none ${
                      activeTab === tab
                        ? 'bg-gray-3 text-gray-12 font-medium shadow-sm'
                        : 'text-gray-9 hover:bg-gray-2'
                    }`}
                  >
                    {LABELS[tab]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-8 overflow-y-auto bg-white">
            {children(activeTab)}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-4 shrink-0 flex justify-end gap-3 bg-white z-10">
          <Button type="default" size="large" onClick={onBack} className="font-poppins">
            Change Field Type
          </Button>
          <Button
            variant="solid"
            color="geekblue"
            size="large"
            loading={isSubmitting}
            onClick={onConfirm}
            className="font-poppins font-medium"
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}
