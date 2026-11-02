export interface Demo {
  _id: string;
  title: string;
  description: string;
  bandId: string;
  userId: string;
  currentVersionId: string | null;
  tempo?: number;
  key?: string;
}