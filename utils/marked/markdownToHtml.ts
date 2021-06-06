import marked from 'marked';

export default function markdownToHtml(mdText: string): string {
  marked.setOptions({ gfm: true, breaks: true });
  return marked(mdText);
}
