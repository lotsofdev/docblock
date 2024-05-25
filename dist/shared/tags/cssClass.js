// @ts-nocheck
import { __idCompliant } from '@lotsof/sugar/string';
/**
 * @name              cssClass
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the cssClass tag
 *
 * @cssClass       {Object}          data        The data object parsed in the string
 * @cssClass       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @cssClass      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function cssClass(data, blockSettings) {
    if (!Array.isArray(data))
        data = [data];
    const res = {};
    data.forEach((cssClass) => {
        if (typeof cssClass !== 'object' ||
            !cssClass.value ||
            typeof cssClass.value !== 'string')
            return;
        const parts = cssClass.value.split(/\s{2,9999}|\t/).map((l) => l.trim());
        let className = parts === null || parts === void 0 ? void 0 : parts[0];
        const name = __idCompliant(className, {});
        const description = parts && parts[1] ? parts[1] : null;
        res[name] = {
            toString() {
                return name;
            },
            name: parts[0],
            description,
        };
        if (cssClass.content) {
            const content = cssClass.content.join('\n');
            res[name].content = content;
        }
    });
    return res;
}
export default cssClass;
//# sourceMappingURL=cssClass.js.map