// @ts-nocheck

import { __idCompliant } from '@coffeekraken/sugar/string';

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
    if (!Array.isArray(data)) data = [data];

    const res = {};

    data.forEach((cssClass) => {
        if (
            typeof cssClass !== 'object' ||
            !cssClass.value ||
            typeof cssClass.value !== 'string'
        )
            return;
        const parts = cssClass.value
            .split(/\s{2,9999}|\t/)
            .map((l) => l.trim());
        let className = parts?.[0];
        const name = __idCompliant(className, {});
        const description = new String(parts && parts[1] ? parts[1] : null);
        description.render = true;

        res[name] = {
            toString() {
                return name;
            },
            name: parts[0],
            description,
        };
        if (cssClass.content) {
            const content = new String(cssClass.content.join('\n'));
            content.render = true;
            res[name].content = content;
        }
    });
    return res;
}
export default cssClass;
