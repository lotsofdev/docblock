export type TDocblockConfig = {
    settings: TDocblockSettings;
};
export type TDocblockSortFnSetting = {
    (a: any, b: any): any;
};
export type TDocblockSettings = {
    filePath?: string;
    filter?: Function;
    filterByTag?: Record<string, any>;
    renderMarkdown: boolean;
    renderMarkdownProps: string[];
    markedOptions: any;
    sortFunction?: TDocblockSortFnSetting;
};
export type TDocblockBlock = {
    [key: string]: any;
};
export type TDocblockBlockTagsMap = {
    [key: string]: Function;
};
export type TDocblockBlockSettings = {
    filePath?: string;
    packageJson: any;
    renderMarkdown: boolean;
    renderMarkdownProps: string[];
    markedOptions: any;
    tags: TDocblockBlockTagsMap;
};
