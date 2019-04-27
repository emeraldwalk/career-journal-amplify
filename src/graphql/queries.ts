// tslint:disable
// this is an auto generated file. This will be overwritten

export const getEntry = `query GetEntry($id: ID!) {
  getEntry(id: $id) {
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
export const listEntrys = `query ListEntrys(
  $filter: ModelEntryFilterInput
  $limit: Int
  $nextToken: String
) {
  listEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getTag = `query GetTag($id: ID!) {
  getTag(id: $id) {
    icon
    id
    owner
    parentId
    value
  }
}
`;
export const listTags = `query ListTags($filter: ModelTagFilterInput, $limit: Int, $nextToken: String) {
  listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      icon
      id
      owner
      parentId
      value
    }
    nextToken
  }
}
`;
