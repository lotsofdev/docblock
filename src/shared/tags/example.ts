// @ts-nocheck

/**
 * @name              example
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the example tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @example      {Object}                      The formated object
 *
 * @todo        interface
 * @todo        doc
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function example(data, blockSettings) {
  if (!Array.isArray(data)) data = [data];
  data = data
    .map((item) => {
      if (item.content && item.content[item.content.length - 1] === '') {
        item.content = item.content.slice(0, -1);
      }
      if (!item.content) return null;

      const parts = item.value.split(/\s{2,9999}|\t/).map((l) => l.trim());

      const result = {
        language: parts[0],
        title: parts[1],
        description: parts[2],
        code: Array.isArray(item.content)
          ? item.content.join('\n').trim().replace(/\\@/, '@')
          : item.content.trim().replace(/\\@/, '@'),
      };

      if (result.title) {
        result.title = result.title;
      }
      if (result.description) {
        result.description = result.description;
      }

      return result;
    })
    .filter((item) => item !== null);

  return data;
}
export default example;
