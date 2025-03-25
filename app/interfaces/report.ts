export interface Report {
  id: string;
  title: string;
  date: string;
  fileName: string;
  topics: Array<string>;
  categories: Array<string>;
  keywords: Array<string>;
}
