const defaults = {
    settings: {
        filter: undefined,
        filterByTag: undefined,
        sortFunction: (a, b) => {
            var _a, _b, _c, _d, _e, _f;
            let res = 0;
            if (!b || !a)
                return res;
            const aObj = a.toObject(), bObj = b.toObject();
            // if (.object.namespace && !aObj.namespace) res -= 1;
            if (bObj.namespace)
                res += 1;
            if (((_b = (_a = bObj.type) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) === 'class')
                res += 1;
            if (bObj.constructor)
                res += 1;
            if (bObj.private)
                res += 1;
            if (((_d = (_c = bObj.type) === null || _c === void 0 ? void 0 : _c.toLowerCase) === null || _d === void 0 ? void 0 : _d.call(_c)) === 'function')
                res += 1;
            if (((_e = bObj.name) === null || _e === void 0 ? void 0 : _e.length) > ((_f = aObj.name) === null || _f === void 0 ? void 0 : _f.length))
                res += 1;
            return res;
        },
        filePath: undefined,
        renderMarkdown: false,
        renderMarkdownProps: [],
        markedOptions: {},
    },
};
export default defaults;
//# sourceMappingURL=defaults.js.map