export interface ThreadModel {
  id: number;
  subforumID: number;
  title: string;
  content: string;
  createdBy: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  replyCount: number;
  createdByName: string;
  subforumName: string;
}
