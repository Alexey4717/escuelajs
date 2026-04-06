export type Styles = {
  animateDrift: string;
  animateFloat: string;
  heroDrift: string;
  heroFloat: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
