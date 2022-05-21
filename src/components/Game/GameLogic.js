export const getRandomNumInRange = (range) =>
    Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0]);
