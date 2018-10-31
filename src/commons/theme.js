const theme = {
  color: {
    R500: '#BF2600',
    R400: '#DE350B',
    R300: '#FF5630',
    R200: '#FF7452',
    R100: '#FF8F73',
    R75: '#FFBDAD',
    R50: '#FFEBE6',
    Y500: '#FF8B00',
    Y400: '#FF991F',
    Y300: '#FFAB00',
    Y200: '#FFC400',
    Y100: '#FFE380',
    Y75: '#FFF0B3',
    Y50: '#FFFAE6',
    G500: '#006644',
    G400: '#00875A',
    G300: '#36B37E',
    G200: '#57D9A3',
    G100: '#79F2C0',
    G75: '#ABF5D1',
    G50: '#E3FCEF',
    T500: '#008DA6',
    T400: '#00A3BF',
    T300: '#00B8D9',
    T200: '#00C7E5',
    T100: '#79E2F2',
    T75: '#B3F5FF',
    T50: '#E6FCFF',
    B500: '#0747A6',
    B400: '#0052CC',
    B300: '#0065FF',
    B200: '#2684FF',
    B100: '#4C9AFF',
    B75: '#B3D4FF',
    B50: '#DEEBFF',
    P500: '#403294',
    P400: '#5243AA',
    P300: '#6554C0',
    P200: '#8777D9',
    P100: '#998DD9',
    P75: '#C0B6F2',
    P50: '#EAE6FF',
    N900: '#091E42',
    N800: '#172B4D',
    N700: '#253858',
    N600: '#344563',
    N500: '#42526E',
    N400: '#505F79',
    N300: '#5E6C84',
    N200: '#6B778C',
    N100: '#7A869A',
    N90: '#8993A4',
    N80: '#97A0AF',
    N70: '#A5ADBA',
    N60: '#B3BAC5',
    N50: '#C1C7D0',
    N40: '#DFE1E6',
    N30: '#EBECF0',
    N20: '#F4F5F7',
    N10: '#FAFBFC',
    N0: '#FFFFFF',
    mainProductBlue: '#2797FB',
  },

  // Box Shadows
  shadow: {
    dark: '0 0.25rem 1rem 0 rgba(9, 30, 66, 0.15)',
    base: '0 0.0675rem 0.5rem 0 rgba(9, 30, 66, 0.15)',
  },

  borderRadius: '0.25rem',

  // Elevations (z-index)
  elevation: {
    modal: '1000',
    overhead: '100',
  },

  // Sizings
  boundary: '75rem',
  halfBoundary: '37.5rem',
  breakpoint: {
    smallMobile: '20rem',
    mobile: '48rem',
    tablet: '64rem',
    smallDesktop: '80rem',
  },
};

export const media = breakpoint => `@media screen and (max-width: ${theme.breakpoint[breakpoint]})`;

export const boundary = `
  width: 100%;
  max-width: ${theme.boundary};
`;

export const halfBoundary = `
  width: 100%;
  max-width: ${theme.halfBoundary};
`;

export const flex = (type = {}) => {
  // eslint-disable-next-line
  const { direction = 'row', wrap = 'wrap', justify = 'center', align = 'center' } = type;

  return `
    display: flex;
    flex-direction: ${direction};
    flex-wrap: ${wrap};
    justify-content: ${justify};
    align-items: ${align};
    align-content: ${align};
  `;
};

export default theme;
