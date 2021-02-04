export const genLabels = (gen) =>
  ({
    [gen]: `Generations 1 - ${gen}`,
    1: "Generation 1",
    2: "Generations 1 & 2",
  }[gen]);
