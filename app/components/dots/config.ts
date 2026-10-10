import tall from './variants/tall';
import Glasses from './accessories/glasses';
export const variants = { tall };
export const accessories = { glasses: Glasses };
export type DotExpression = 'welcome' | 'focused' | 'curious' | 'confident' | 'happy';
export type DotProps = {
  variant: keyof typeof variants;
  color: string;
  accessory?: keyof typeof accessories;
  size: number;
  position: [number, number, number];
};
export const mascot: DotProps = {
  variant: 'tall', color: '#FFC21A', size: 1, position: [0, 0, 0],
};
