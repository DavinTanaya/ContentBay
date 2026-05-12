import icon1 from './icon1.svg';
import icon2 from './icon2.svg';
import icon3 from './icon3.svg';
import icon4 from './icon4.svg';
import icon5 from './icon5.svg';
import icon6 from './icon6.svg';
import icon7 from './icon7.svg';
import checkIcon from './check.svg';
import stackIcon from './stack.svg';
import frontendImg from './frontend.jpg';
import futureImg from './future.jpg';
import omnichannelImg from './omnichannel.jpg';

export const ProductAssets = {
  icons: {
    performance1: icon1,
    performance2: icon2,
    performance3: icon3,
    performance4: icon4,
    performance5: icon5,
    performance6: icon6,
    performance7: icon7,
    check: checkIcon,
    stack: stackIcon,
  },
  images: {
    frontend: frontendImg,
    future: futureImg,
    omnichannel: omnichannelImg,
  },
} as const;
