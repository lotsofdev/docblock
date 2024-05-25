// @ts-nocheck

import { __parse } from '@lotsof/sugar/string';
import { __resolveTypeString } from '@lotsof/sugar/type';

/**
 * @name                param
 * @namespace           node.tags
 * @type                Function
 * @platform            node
 * @status              beta
 *
 * Parse the param tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @param      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
async function param(data, blockSettings) {
  if (!Array.isArray(data)) data = [data];

  const res = {};

  for (let [i, param] of Object.entries(data)) {
    if (
      typeof param !== 'object' ||
      !param.value ||
      typeof param.value !== 'string'
    )
      return;
    const parts = param.value.split(/\s{2,9999}|\t/).map((l) => l.trim());
    let typeStr = parts && parts[0] ? parts[0] : null;
    const variable = parts && parts[1] ? parts[1] : null;
    const description = parts && parts[2] ? parts[2] : null;
    let name = variable;
    let defaultValue = undefined;
    let defaultValueStr = '';
    let variableMatch = null;
    let type;

    if (variable && typeof variable === 'string')
      variableMatch = variable.match(/^\[(.*)\]$/);

    // resolve type string
    type = await __resolveTypeString(typeStr);

    if (variableMatch) {
      const variableParts = variableMatch[1].split('=');

      if (variableParts.length === 2) {
        name = variableParts[0].trim();
        defaultValueStr = variableParts[1].trim();
        defaultValue = __parse(variableParts[1].trim());
      }
    }
    res[name] = {
      name,
      type,
      description,
      default: defaultValue,
      defaultStr: defaultValueStr,
    };

    if (param.content) res[name].content = param.content.join('\n');
  }

  return res;
}
export default param;
