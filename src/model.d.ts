import { Block } from './@types/portable-text';
import { Dict } from './util/common';

export interface Entry {
  // categoryTags: string,
  // content: string,
  categoryTags: Dict<string>,
  content: Block[],
  createdAt: string | null,
  date: string,
  id: string,
  owner: string | null,
  tags: Array<string>,
  title: string,
  updatedAt: string | null,
}

export type EntryRaw = Extend<Entry, {
  categoryTags: string,
  content: string
}>;

export interface Tag {
  icon: string | null,
  id: string,
  owner: string | null,
  parentId: string,
  value: string,
}