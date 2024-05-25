// @ts-nocheck
function todo(data, blockSettings) {
    if (!Array.isArray(data))
        data = [data];
    const res = [];
    data.forEach((todo) => {
        var _a, _b;
        if (!todo.value)
            return;
        const parts = todo.value.split(/\s{2,9999}|\t/).map((l) => l.trim());
        const priority = (_a = parts[1]) !== null && _a !== void 0 ? _a : 'normal', description = (_b = parts[0]) !== null && _b !== void 0 ? _b : '';
        res.push({
            priority,
            description,
        });
    });
    return res;
}
export default todo;
//# sourceMappingURL=todo.js.map