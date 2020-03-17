export interface pkgJson {
  devDependencies: obj<string>;
  dependencies: obj<string>;
}

export type obj<T> = {
  [key: string]: T;
};

export type supportedLangs = "js";

export type dataFileItem = {
  /** the data when it was made */
  madeIn: string;
  /** the dir was open when it was created */
  dir: string;
  /** the file path for it */
  path: string;
};

export type dataFile = {
  js: dataFileItem[];
};
