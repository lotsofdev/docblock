import { TResolveTypeStringResult } from '../../../../sugar/dist/node/type/resolveTypeString.js';
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
declare function typeTag(data: any, blockSettings: any): Promise<TResolveTypeStringResult>;
export default typeTag;
