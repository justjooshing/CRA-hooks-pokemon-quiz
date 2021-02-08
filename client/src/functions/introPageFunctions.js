export const genLabels = (method, gen) =>
  ({
    range: {
      [gen]: `Generations 1 - ${gen}`,
      1: "Generation 1",
      2: "Generations 1 & 2",
    },
    exact: {
      [gen]: `Generation ${gen}`,
    },
  }[method][gen]);
