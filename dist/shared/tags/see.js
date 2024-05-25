// @ts-nocheck
/**
 * @name              see
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the see tag
 *
 * @see       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @see      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function see(data, blockSettings) {
    if (!Array.isArray(data))
        data = [data];
    const res = [];
    data.forEach((see) => {
        var _a;
        if (!see.value)
            return;
        const parts = see.value.split(/\s{2,9999}|\t/).map((l) => l.trim());
        const url = parts[0], description = (_a = parts[1]) !== null && _a !== void 0 ? _a : '';
        res.push({
            url,
            description,
        });
    });
    return res;
}
export default see;
//# sourceMappingURL=see.js.map