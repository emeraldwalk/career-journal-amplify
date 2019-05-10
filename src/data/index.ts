import { API, graphqlOperation } from "aws-amplify";
import { CreateEntryInput, CreateTagInput, UpdateEntryInput, UpdateTagInput } from "../API";
import {
  createEntry as createEntryMutation,
  createTag as createTagMutation,
  updateEntry as updateEntryMutation,
  updateTag as updateTagMutation
} from '../graphql/mutations';
import {
  listEntrys as listEntriesQuery,
  listTags as listTagsQuery
} from '../graphql/queries';
import { Entry, EntryRaw, Tag } from '../model';
import { localISODayStr } from "../util/date";

export async function gql<T extends object>(
  query: string,
  variables?: {}
): Promise<T> {
  const { data } = await API.graphql(
    graphqlOperation(
      query,
      variables
    )
  ) as { data: T };

  return data;
}

export async function createEntry(
  input: CreateEntryInput
): Promise<Entry> {
  const { createEntry } = await gql<{ createEntry: EntryRaw }>(
    createEntryMutation,
    { input }
  )

  return await fromRaw(createEntry);
}

function fromRaw(raw: EntryRaw): Entry {
  return {
    ...raw,
    categoryTags: JSON.parse(raw.categoryTags) as Entry['categoryTags'],
    content: JSON.parse(raw.content) as Entry['content']
  };
}

export async function listEntries(): Promise<Entry[]> {
  const data = await gql<{ listEntrys: { items: Entry[] } }>(
    listEntriesQuery,
    {
      limit: 50
    }
  );

  return data.listEntrys.items.map(fromRaw);
}

export function newEntry(): CreateEntryInput {
  return {
    categoryTags: JSON.stringify({}),
    content: JSON.stringify([
      {
        _type: 'block',
        markDefs: [],
        children: [
          {
            _type: 'span',
            text: null,
            marks: []
          }
        ]
      }
    ]),
    date: localISODayStr(),
    tags: [],
    title: '[New Entry]',
    createdAt: new Date().toISOString()
  };
}

export async function createTag(
  input: CreateTagInput
) {
  const data = await gql<{ createTag: Tag }>(
    createTagMutation,
    { input }
  );
  return data.createTag;
}

export async function listTags() {
  const data = await gql<{ listTags: { items: Tag[] } }>(
    listTagsQuery,
    {
      limit: 50
    }
  );
  return data.listTags.items;
}

export async function updateEntry(
  input: UpdateEntryInput
): Promise<Entry> {
  const data = await gql<{ updateEntry: Entry }>(
    updateEntryMutation,
    { input }
  );
  return fromRaw(
    data.updateEntry
  );
}

export async function updateTag(
  input: UpdateTagInput
): Promise<Tag> {
  const data = await gql<{ updateTag: Tag }>(
    updateTagMutation,
    { input }
  );
  return data.updateTag;
}

export function getCategory(
  tags: Tag[],
  categoryId: string
) {
  const category = tags.find(tag => tag.id === categoryId);
  if (!category) {
    return null;
  }

  return {
    category,
    tags: tags.filter(tag => tag.parentId === category.id)
  };
}