// @ts-nocheck
import { __urlFromString } from '@lotsof/sugar/url';

/**
 * @name              menuTag
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the menu tag
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
function menuTag(data, blockSettings) {
  if (data && data.value && typeof data.value === 'string') {
    const parts = data.value.split(/\s{2,9999}|\t/).map((l) => l.trim());

    let slug;

    if (parts.length > 1) {
      slug = parts[1];
    } else {
      slug = parts[0].split('/').map((l) => {
        return __urlFromString(l);
      });
    }

    return {
      tree: parts[0].split('/').map((l) => l.trim()),
      slug,
    };
  }
  return data.value;
}
export default menuTag;
