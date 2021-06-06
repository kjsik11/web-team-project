interface NoticeInfo {
  _id: string;
  title: string;
  markdownUrl: string;
  created: string;
  lastUpdated: string;
  deleted: string | null;
}

interface NoticeInputs {
  title: string;
  content: string;
}
