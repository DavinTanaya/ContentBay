/**
 * Configuration options for the ContentBay SDK client.
 */
export interface ContentBayConfig {
  /** The workspace ID from your ContentBay dashboard */
  spaceId: string;
  /** The API token from your ContentBay dashboard */
  apiToken: string;
  /** The base URL of the ContentBay API (optional, defaults to https://api.contentbay.io) */
  apiUrl?: string;
}
