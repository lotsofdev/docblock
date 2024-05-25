// @ts-nocheck

/**
 * @name              todo
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the todo tag
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

export interface ITodo {
  priority: 'low' | 'normal' | 'high';
  description: string;
}

function todo(data, blockSettings): ITodo[] {
  if (!Array.isArray(data)) data = [data];

  const res = [];

  data.forEach((todo) => {
    if (!todo.value) return;

    const parts = todo.value.split(/\s{2,9999}|\t/).map((l) => l.trim());

    const priority = parts[1] ?? 'normal',
      description = parts[0] ?? '';

    res.push({
      priority,
      description,
    });
  });
  return res;
}
export default todo;
