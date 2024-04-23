// @ts-nocheck

/**
 * @name              param
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the param tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @param      {Array<IPlatform>}                      An array of platform obj
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */

export interface IPlatform {
  name: string;
  description: string;
}

function param(data, blockSettings): IPlatform[] {
  if (!Array.isArray(data)) data = [data];

  const res = [];

  data.forEach((param) => {
    if (!param.value) return;

    const parts = param.value.split(/\s{2,9999}|\t/).map((l) => l.trim());

    res.push({
      name: parts[0],
      description: parts[1] ?? '',
    });
  });
  return res;
}
export default param;
