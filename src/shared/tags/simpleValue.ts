// @ts-nocheck

/**
 * @name              simpleValue
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the simpleValue tag
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
function simpleValue(data, blockSettings) {
  if (
    data &&
    data.value &&
    typeof data.value === 'string' &&
    data.value.trim() === ''
  ) {
    return true;
  }

  const value = data.value;
  return value;
}
export default simpleValue;
