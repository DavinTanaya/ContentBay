// icon
import FacebookIcon from './icons/FacebookIcon';
import GithubIcon from './icons/GithubIcon';
import GoogleIcon from './icons/GoogleIcon';
import DiscordIcon from './icons/DiscordIcon';

// ui
import { LandingHero } from './LandingHero';

export const sharedUi = {
  landingHero: LandingHero,
  icon: {
    google: GoogleIcon,
    facebook: FacebookIcon,
    github: GithubIcon,
    discord: DiscordIcon,
  },
} as const;
