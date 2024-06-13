// @ts-nocheck
import { __escapeHtml } from '@lotsof/sugar/html';

/**
 * @name              description
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the description tag
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
function description(data, blockSettings) {
  if (Array.isArray(data)) data = data[0];

  if (data.content && data.content[data.content.length - 1] === '') {
    data.content = data.content.slice(0, -1);
  }
  if (!data.content) return '';
  const description = data.content
    .map((c) => c.replace(/^\s/, ''))
    .join('\n')
    .trim();
  return __escapeHtml(description);
}
export default description;
