/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateEntryInput = {
  categoryTags: string,
  content: string,
  createdAt?: string | null,
  date: string,
  id?: string | null,
  tags: Array< string >,
  title: string,
  updatedAt?: string | null,
};

export type UpdateEntryInput = {
  categoryTags?: string | null,
  content?: string | null,
  createdAt?: string | null,
  date?: string | null,
  id: string,
  tags?: Array< string > | null,
  title?: string | null,
  updatedAt?: string | null,
};

export type DeleteEntryInput = {
  id?: string | null,
};

export type CreateTagInput = {
  icon?: string | null,
  id?: string | null,
  parentId: string,
  value: string,
};

export type UpdateTagInput = {
  icon?: string | null,
  id: string,
  parentId?: string | null,
  value?: string | null,
};

export type DeleteTagInput = {
  id?: string | null,
};

export type ModelEntryFilterInput = {
  categoryTags?: ModelStringFilterInput | null,
  content?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  date?: ModelStringFilterInput | null,
  id?: ModelIDFilterInput | null,
  tags?: ModelStringFilterInput | null,
  title?: ModelStringFilterInput | null,
  updatedAt?: ModelStringFilterInput | null,
  and?: Array< ModelEntryFilterInput | null > | null,
  or?: Array< ModelEntryFilterInput | null > | null,
  not?: ModelEntryFilterInput | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelTagFilterInput = {
  icon?: ModelStringFilterInput | null,
  id?: ModelIDFilterInput | null,
  parentId?: ModelIDFilterInput | null,
  value?: ModelStringFilterInput | null,
  and?: Array< ModelTagFilterInput | null > | null,
  or?: Array< ModelTagFilterInput | null > | null,
  not?: ModelTagFilterInput | null,
};

export type CreateEntryMutationVariables = {
  input: CreateEntryInput,
};

export type CreateEntryMutation = {
  createEntry:  {
    __typename: "Entry",
    categoryTags: string,
    content: string,
    createdAt: string | null,
    date: string,
    id: string,
    tags: Array< string >,
    title: string,
    updatedAt: string | null,
  } | null,
};

export type UpdateEntryMutationVariables = {
  input: UpdateEntryInput,
};

export type UpdateEntryMutation = {
  updateEntry:  {
    __typename: "Entry",
    categoryTags: string,
    content: string,
    createdAt: string | null,
    date: string,
    id: string,
    tags: Array< string >,
    title: string,
    updatedAt: string | null,
  } | null,
};

export type DeleteEntryMutationVariables = {
  input: DeleteEntryInput,
};

export type DeleteEntryMutation = {
  deleteEntry:  {
    __typename: "Entry",
    categoryTags: string,
    content: string,
    createdAt: string | null,
    date: string,
    id: string,
    tags: Array< string >,
    title: string,
    updatedAt: string | null,
  } | null,
};

export type CreateTagMutationVariables = {
  input: CreateTagInput,
};

export type CreateTagMutation = {
  createTag:  {
    __typename: "Tag",
    icon: string | null,
    id: string,
    parentId: string,
    value: string,
  } | null,
};

export type UpdateTagMutationVariables = {
  input: UpdateTagInput,
};

export type UpdateTagMutation = {
  updateTag:  {
    __typename: "Tag",
    icon: string | null,
    id: string,
    parentId: string,
    value: string,
  } | null,
};

export type DeleteTagMutationVariables = {
  input: DeleteTagInput,
};

export type DeleteTagMutation = {
  deleteTag:  {
    __typename: "Tag",
    icon: string | null,
    id: string,
    parentId: string,
    value: string,
  } | null,
};

export type GetEntryQueryVariables = {
  id: string,
};

export type GetEntryQuery = {
  getEntry:  {
    __typename: "Entry",
    categoryTags: string,
    content: string,
    createdAt: string | null,
    date: string,
    id: string,
    tags: Array< string >,
    title: string,
    updatedAt: string | null,
  } | null,
};

export type ListEntrysQueryVariables = {
  filter?: ModelEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEntrysQuery = {
  listEntrys:  {
    __typename: "ModelEntryConnection",
    items:  Array< {
      __typename: "Entry",
      categoryTags: string,
      content: string,
      createdAt: string | null,
      date: string,
      id: string,
      tags: Array< string >,
      title: string,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTagQueryVariables = {
  id: string,
};

export type GetTagQuery = {
  getTag:  {
    __typename: "Tag",
    icon: string | null,
    id: string,
    parentId: string,
    value: string,
  } | null,
};

export type ListTagsQueryVariables = {
  filter?: ModelTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTagsQuery = {
  listTags:  {
    __typename: "ModelTagConnection",
    items:  Array< {
      __typename: "Tag",
      icon: string | null,
      id: string,
      parentId: string,
      value: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateEntrySubscription = {
  onCreateEntry:  {
    __typename: "Entry",
    categoryTags: string,
    content: string,
    createdAt: string | null,
    date: string,
    id: string,
    tags: Array< string >,
    title: string,
    updatedAt: string | null,
  } | null,
};

export type OnUpdateEntrySubscription = {
  onUpdateEntry:  {
    __typename: "Entry",
    categoryTags: string,
    content: string,
    createdAt: string | null,
    date: string,
    id: string,
    tags: Array< string >,
    title: string,
    updatedAt: string | null,
  } | null,
};

export type OnDeleteEntrySubscription = {
  onDeleteEntry:  {
    __typename: "Entry",
    categoryTags: string,
    content: string,
    createdAt: string | null,
    date: string,
    id: string,
    tags: Array< string >,
    title: string,
    updatedAt: string | null,
  } | null,
};

export type OnCreateTagSubscription = {
  onCreateTag:  {
    __typename: "Tag",
    icon: string | null,
    id: string,
    parentId: string,
    value: string,
  } | null,
};

export type OnUpdateTagSubscription = {
  onUpdateTag:  {
    __typename: "Tag",
    icon: string | null,
    id: string,
    parentId: string,
    value: string,
  } | null,
};

export type OnDeleteTagSubscription = {
  onDeleteTag:  {
    __typename: "Tag",
    icon: string | null,
    id: string,
    parentId: string,
    value: string,
  } | null,
};
