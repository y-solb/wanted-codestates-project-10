const colors = {
  black: '#000000',
  white: '#FFFFFF',
  skyBlue: '#CAE9FF',
  blue: '#007BE9',
  gray: '#6A737B',
  lightGray: '#f4f4f4',
};

const fontSizes = {
  small: '0.825rem',
  regular: '1rem',
  medium: '1.125rem',
  large: '2.125rem',
};

const deviceSizes = {
  laptop: '1040px',
};

const device = {
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
};

const theme = {
  colors,
  fontSizes,
  device,
};

export default theme;
