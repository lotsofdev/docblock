// @ts-nocheck
/**
 * @name              contributor
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the contributor tag
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
function contributor(data, blockSettings) {
    data = Array.from(data);
    const contributors = [];
    data.forEach((d) => {
        const contributorNfo = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm.exec(d.value);
        if (!contributorNfo)
            return null;
        contributors.push({
            toString() {
                return d.value;
            },
            name: contributorNfo[1],
            email: contributorNfo[2],
            url: contributorNfo[3],
        });
    });
    return contributors;
}
export default contributor;
//# sourceMappingURL=contributor.js.map