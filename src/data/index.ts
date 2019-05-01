import { API, graphqlOperation } from "aws-amplify";
import { CreateTagInput, UpdateTagInput } from "../API";
import {
  createTag as createTagMutation,
  updateTag as updateTagMutation
} from '../graphql/mutations';
import { listTags as listTagsQuery } from '../graphql/queries';
import { Tag } from '../model';

export async function gql<T extends object>(
  query: string,
  variables?: {}
) {
  const { data } = await API.graphql(
    graphqlOperation(
      query,
      variables
    )
  ) as { data: T };

  return data;
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

export async function updateTag(
  input: UpdateTagInput
) {
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