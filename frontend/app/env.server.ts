export function getEnv() {
  return {
    API_URL: process.env.API_URL || 'http://127.0.0.1:4000/graphql',
  };
}

export type ENV = ReturnType<typeof getEnv>;

// TODO: may not need all of these
declare global {
  var ENV: ENV;
  interface Window {
    apiURL: URL;
    env: ENV;
  }
}
