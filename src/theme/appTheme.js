const defaultThemeConfig = {
  primary: "greenyellow",
  secondary: "tomato",
  textColor: "#2a2a2a",
  contrastText: "#dadada",
  borderColor: "#777",
  spacingStep: 4
};

const createTheme = (config) => ({
  ...defaultThemeConfig,
  ...config,

  spacing(value) {
    return `${value * this.spacingStep}px`;
  }
});

export default createTheme;
