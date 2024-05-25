// @ts-nocheck

/**
 * @name              support
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the support tag
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

function support(data, blockSettings): IPlatform[] {
  if (!Array.isArray(data)) data = [data];

  const res = [];

  data.forEach((support) => {
    if (!support.value) return;

    const parts = support.value.split(/\s{2,9999}|\t/).map((l) => l.trim());
    const description = parts[1] ?? '';

    res.push({
      name: parts[0],
      description,
    });
  });
  return res;
}
export default support;
