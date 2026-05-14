import { LandingAssets } from './assets';
import { LandingComponents } from './ui';
import Documentation from './documentation';
import Home from './home';
import Product from './product';
import Resources from './resources';

export const LandingPage = {
  assets: LandingAssets,
  components: LandingComponents,
  home: Home,
  product: Product,
  resource: Resources,
  documentation: Documentation,
} as const;
