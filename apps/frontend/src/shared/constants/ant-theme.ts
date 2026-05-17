import type { ThemeConfig } from 'antd';
import { antSemanticTokens } from './colors';

/**
 * RE-EXPORTS
 * We re-export these so that existing imports don't break immediately,
 * but new code should ideally import directly from colors.ts or typography.ts
 */
export * from './colors';
export * from './typography';

export const antThemeConfig: ThemeConfig = {
  token: {
    fontFamily: 'Poppins, sans-serif',
    ...antSemanticTokens,
  },
  components: {
    Button: {
      borderRadius: 8,
      borderRadiusSM: 8,
      borderRadiusLG: 8,
      fontWeight: 500,
      contentFontSize: 16,
      contentFontSizeSM: 14,
      contentFontSizeLG: 18,
      controlHeight: 42,
      controlHeightSM: 36,
      paddingInline: 20,
      paddingInlineLG: 24,
      paddingInlineSM: 16,
    },
    Typography: {
      fontFamily: 'Poppins, sans-serif',
    },
  },
};
