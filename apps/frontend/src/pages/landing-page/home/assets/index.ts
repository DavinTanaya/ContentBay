import heroImg from './hero.png';
import builtImg from './built.png';
import featuresImg from './features.jpg';
import solutionsImg from './solutions.jpg';
import expensiveIcon from './expensive.svg';
import repetitiveIcon from './repetitive.svg';
import unstructuredIcon from './unstructured.svg';
import checkIcon from './check.svg';

export const HomeAssets = {
  images: {
    hero: heroImg,
    built: builtImg,
    features: featuresImg,
    solutions: solutionsImg,
  },
  icons: {
    expensive: expensiveIcon,
    repetitive: repetitiveIcon,
    unstructured: unstructuredIcon,
    check: checkIcon,
  },
} as const;
