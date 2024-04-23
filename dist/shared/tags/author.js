// @ts-nocheck
/**
 * @name              author
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the author tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function author(data, blockSettings) {
    const authorNfo = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm.exec(data.value);
    if (!authorNfo)
        return null;
    return {
        toString() {
            return data.value;
        },
        name: authorNfo[1],
        email: authorNfo[2],
        url: authorNfo[3],
    };
}
export default author;
//# sourceMappingURL=author.js.map