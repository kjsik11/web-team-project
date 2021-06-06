interface NoticeInfo {
  _id: string;
  title: string;
  markdownUrl: string;
  writer: {
    _id: string;
    name: string;
  };
  history: {
    title: string;
    markdownUrl: string;
    writer: {
      _id: string;
      name: string;
    };
    updated: string;
  }[];
  created: string;
  lastUpdated: string;
  deleted: string | null;
}

interface NoticeInputs {
  title: string;
  content: string;
}
