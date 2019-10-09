export default {
  get: (url: string) => fetch(url).then(response => response.json()),
};
