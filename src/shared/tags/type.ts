// @ts-nocheck

import {__resolveTypeString} from '@coffeekraken/sugar/type';

/**
 * @name              type
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the type tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
async function typeTag(data, blockSettings) {
    const value = await __resolveTypeString(`{${data.value}}`);
    return value;
}
export default typeTag;
