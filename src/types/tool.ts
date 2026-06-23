export type ToolType =
  | 'calculator'
  | 'converter'
  | 'formatter'
  | 'generator'
  | 'encoder'
  | 'decoder'
  | 'image-tool'
  | 'pdf-tool'
  | 'text-tool'
  | 'developer-tool'
  | 'seo-tool'
  | 'social-tool'
  | 'student-tool';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  faq: FAQItem[];
  relatedTools: string[]; // related tools by slugs
  toolType: ToolType;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  minToolsCount: number;
}
