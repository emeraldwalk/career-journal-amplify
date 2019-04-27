// tslint:disable
// this is an auto generated file. This will be overwritten

export const createEntry = `mutation CreateEntry($input: CreateEntryInput!) {
  createEntry(input: $input) {
    categoryTags
    content
    createdAt
    date
    id
    owner
    tags
    title
    updatedAt
  }
}
`;
export const updateEntry = `mutation UpdateEntry($input: UpdateEntryInput!) {
  updateEntry(input: $input) {
    categoryTags
    content
    createdAt
    date
    id
    owner
    tags
    title
    updatedAt
  }
}
`;
export const deleteEntry = `mutation DeleteEntry($input: DeleteEntryInput!) {
  deleteEntry(input: $input) {
    categoryTags
    content
    createdAt
    date
    id
    owner
    tags
    title
    updatedAt
  }
}
`;
export const createTag = `mutation CreateTag($input: CreateTagInput!) {
  createTag(input: $input) {
    icon
    id
    owner
    parentId
    value
  }
}
`;
export const updateTag = `mutation UpdateTag($input: UpdateTagInput!) {
  updateTag(input: $input) {
    icon
    id
    owner
    parentId
    value
  }
}
`;
export const deleteTag = `mutation DeleteTag($input: DeleteTagInput!) {
  deleteTag(input: $input) {
    icon
    id
    owner
    parentId
    value
  }
}
`;
