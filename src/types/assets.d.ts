/** Videos are imported so the bundler serves them under a hashed, long-cached URL. */
declare module "*.mp4" {
  const src: string;
  export default src;
}
