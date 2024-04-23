// @ts-nocheck
function param(data, blockSettings) {
    if (!Array.isArray(data))
        data = [data];
    const res = [];
    data.forEach((param) => {
        var _a;
        if (!param.value)
            return;
        const parts = param.value.split(/\s{2,9999}|\t/).map((l) => l.trim());
        res.push({
            name: parts[0],
            description: (_a = parts[1]) !== null && _a !== void 0 ? _a : '',
        });
    });
    return res;
}
export default param;
//# sourceMappingURL=platform.js.map