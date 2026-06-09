import { Checkbox } from 'antd';
import type { RichTextField } from '../../types';
import { SwitchRow } from '../shared/SwitchRow';

interface RichTextFieldSettingsFormProps {
  data: RichTextField;
  onChange: (updates: Partial<RichTextField>) => void;
}

export function RichTextFieldSettingsForm({ data, onChange }: RichTextFieldSettingsFormProps) {
  const editorOptions = data.settings?.editorOptions || {
    headings: { h1: true, h2: true, h3: true, h4: true, h5: true, h6: true },
    bold: true, italic: true, underline: true, code: true,
    superscript: true, subscript: true, strikethrough: true,
    unorderedList: true, orderedList: true, blockquote: true,
    horizontalRule: true, table: true,
  };

  const hyperlinkOptions = data.settings?.hyperlinkOptions || {
    externalUrl: true, entryLink: true, assetLink: true,
  };

  const embedOptions = data.settings?.embedOptions || {
    embeddedEntry: true, inlineEntry: true, embeddedAsset: true,
  };

  const updateEditorOptions = (updates: Partial<NonNullable<NonNullable<RichTextField['settings']>['editorOptions']>>) => {
    onChange({ settings: { ...data.settings, editorOptions: { ...editorOptions, ...updates } } });
  };

  const updateHyperlinkOptions = (updates: Partial<NonNullable<NonNullable<RichTextField['settings']>['hyperlinkOptions']>>) => {
    onChange({ settings: { ...data.settings, hyperlinkOptions: { ...hyperlinkOptions, ...updates } } });
  };

  const updateEmbedOptions = (updates: Partial<NonNullable<NonNullable<RichTextField['settings']>['embedOptions']>>) => {
    onChange({ settings: { ...data.settings, embedOptions: { ...embedOptions, ...updates } } });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Formatting Options</h3>
        <div className="grid grid-cols-2 gap-4">
          <Checkbox checked={editorOptions.bold} onChange={(e) => updateEditorOptions({ bold: e.target.checked })}>Bold</Checkbox>
          <Checkbox checked={editorOptions.italic} onChange={(e) => updateEditorOptions({ italic: e.target.checked })}>Italic</Checkbox>
          <Checkbox checked={editorOptions.underline} onChange={(e) => updateEditorOptions({ underline: e.target.checked })}>Underline</Checkbox>
          <Checkbox checked={editorOptions.strikethrough} onChange={(e) => updateEditorOptions({ strikethrough: e.target.checked })}>Strikethrough</Checkbox>
          <Checkbox checked={editorOptions.code} onChange={(e) => updateEditorOptions({ code: e.target.checked })}>Code</Checkbox>
          <Checkbox checked={editorOptions.superscript} onChange={(e) => updateEditorOptions({ superscript: e.target.checked })}>Superscript</Checkbox>
          <Checkbox checked={editorOptions.subscript} onChange={(e) => updateEditorOptions({ subscript: e.target.checked })}>Subscript</Checkbox>
          <Checkbox checked={editorOptions.unorderedList} onChange={(e) => updateEditorOptions({ unorderedList: e.target.checked })}>Unordered List</Checkbox>
          <Checkbox checked={editorOptions.orderedList} onChange={(e) => updateEditorOptions({ orderedList: e.target.checked })}>Ordered List</Checkbox>
          <Checkbox checked={editorOptions.blockquote} onChange={(e) => updateEditorOptions({ blockquote: e.target.checked })}>Blockquote</Checkbox>
          <Checkbox checked={editorOptions.horizontalRule} onChange={(e) => updateEditorOptions({ horizontalRule: e.target.checked })}>Horizontal Rule</Checkbox>
          <Checkbox checked={editorOptions.table} onChange={(e) => updateEditorOptions({ table: e.target.checked })}>Table</Checkbox>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Hyperlink Options</h3>
        <div className="flex flex-col gap-4">
          <SwitchRow title="External URL" description="Allow linking to external URLs" checked={hyperlinkOptions.externalUrl} onChange={(c) => updateHyperlinkOptions({ externalUrl: c })} />
          <SwitchRow title="Entry Link" description="Allow linking to other entries" checked={hyperlinkOptions.entryLink} onChange={(c) => updateHyperlinkOptions({ entryLink: c })} />
          <SwitchRow title="Asset Link" description="Allow linking to assets" checked={hyperlinkOptions.assetLink} onChange={(c) => updateHyperlinkOptions({ assetLink: c })} />
        </div>
      </div>

      <div className="border-t border-gray-100" />

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Embed Options</h3>
        <div className="flex flex-col gap-4">
          <SwitchRow title="Embedded Entry" description="Allow embedding entries as blocks" checked={embedOptions.embeddedEntry} onChange={(c) => updateEmbedOptions({ embeddedEntry: c })} />
          <SwitchRow title="Inline Entry" description="Allow embedding entries inline" checked={embedOptions.inlineEntry} onChange={(c) => updateEmbedOptions({ inlineEntry: c })} />
          <SwitchRow title="Embedded Asset" description="Allow embedding assets" checked={embedOptions.embeddedAsset} onChange={(c) => updateEmbedOptions({ embeddedAsset: c })} />
        </div>
      </div>
    </div>
  );
}
