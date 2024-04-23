// @ts-nocheck
function support(data, blockSettings) {
    if (!Array.isArray(data))
        data = [data];
    const res = [];
    data.forEach((support) => {
        var _a;
        if (!support.value)
            return;
        const parts = support.value.split(/\s{2,9999}|\t/).map((l) => l.trim());
        const description = new String((_a = parts[1]) !== null && _a !== void 0 ? _a : '');
        description.render = true;
        res.push({
            name: parts[0],
            description,
        });
    });
    return res;
}
export default support;
//# sourceMappingURL=support.js.map