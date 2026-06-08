import Documentation from './documentation';
import Home from './home';
import Product from './product';
import Resources from './resources';

export const LandingPage = {
  home: Home,
  product: Product,
  resource: Resources,
  documentation: Documentation,
} as const;
