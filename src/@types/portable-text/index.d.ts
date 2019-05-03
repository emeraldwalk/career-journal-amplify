export interface Block {
  _type: 'block',
  _key?: BlockKey,
  children: Span[],
  markDefs: Mark[]
}

export type BlockKey = string;

export type Mark = {
  _type: 'link',
  _key: MarkKey,
  href: string
}

export type MarkKey = string;

export interface Span {
  _type: 'span',
  marks: MarkKey[],
  text: string | null
}