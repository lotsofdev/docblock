import { TDocblockConfig } from './types.js';

const defaults: TDocblockConfig = {
  settings: {
    filter: undefined,
    filterByTag: undefined,
    sortFunction: (a, b) => {
      let res = 0;

      if (!b || !a) return res;

      const aObj = a.toObject(),
        bObj = b.toObject();

      // if (.object.namespace && !aObj.namespace) res -= 1;
      if (bObj.namespace) res += 1;
      if (bObj.type?.toLowerCase?.() === 'class') res += 1;
      if (bObj.constructor) res += 1;
      if (bObj.private) res += 1;
      if (bObj.type?.toLowerCase?.() === 'function') res += 1;
      if (bObj.name?.length > aObj.name?.length) res += 1;
      return res;
    },
    filePath: undefined,
    renderMarkdown: false,
    renderMarkdownProps: [],
    markedOptions: {},
  },
};

export default defaults;
