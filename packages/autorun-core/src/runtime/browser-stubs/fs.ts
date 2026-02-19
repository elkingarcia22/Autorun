export const readFileSync = () => {
  throw new Error('fs.readFileSync is not available in browser');
};
export const existsSync = () => false;
export const readdirSync = () => {
  throw new Error('fs.readdirSync is not available in browser');
};
export const statSync = () => {
  throw new Error('fs.statSync is not available in browser');
};
