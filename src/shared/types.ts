export interface IDocblockConfig {
  settings: IDocblockSettings;
}

export interface IDocblockSortFnSetting {
  (a: any, b: any);
}
export interface IDocblockSettings {
  filePath?: string;
  filter?: Function;
  filterByTag?: Record<string, any>;
  renderMarkdown: boolean;
  renderMarkdownProps: string[];
  markedOptions: any;
  sortFunction?: IDocblockSortFnSetting;
}

export interface IDocblockBlockTagsMap {
  [key: string]: Function;
}

export interface IDocblockBlockSettings {
  filePath?: string;
  packageJson: any;
  renderMarkdown: boolean;
  renderMarkdownProps: string[];
  markedOptions: any;
  tags: IDocblockBlockTagsMap;
}
