// @ts-nocheck
/**
 * @name              eventTag
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the event tag
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
function eventTag(data, blockSettings) {
    data = Array.from(data);
    data = data.map((d) => {
        if (d && d.value && typeof d.value === 'string') {
            const parts = d.value.split(/\s{2,9999}|\t/).map((l) => l.trim());
            let eventName = parts[0], description = parts[1];
            return {
                name: eventName,
                description,
            };
        }
    });
    return data;
}
export default eventTag;
//# sourceMappingURL=event.js.map