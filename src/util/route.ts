interface Landing {
  type: 'landing'
}

interface CategoryList {
  type: 'categoryList'
}

interface CategoryListEdit {
  type: 'categoryListEdit'
}

interface CategoryDetail {
  type: 'categoryDetail',
  id: string
}

interface CategoryEdit {
  type: 'categoryEdit',
  id: string
}

interface EntryEdit {
  type: 'entryEdit',
  id: string
}

interface EntryList {
  type: 'entryList'
}

interface NotFound {
  type: 'notFound'
}

export type Route =
  | CategoryDetail
  | CategoryEdit
  | CategoryList
  | CategoryListEdit
  | EntryEdit
  | EntryList
  | NotFound;

export function router(
  path: string
): Route {
  if(path === '/') {
    return {
      type: 'entryList'
    };
  }

  if(/^\/tag$/.test(path)) {
    return {
      type: 'categoryList'
    };
  }

  if(/^\/tag\/edit$/.test(path)) {
    return {
      type: 'categoryListEdit'
    };
  }

  const [, tagId = undefined, isEdit = undefined] = path.match(
    /^\/tag\/([^/]+)(\/edit)?$/
  ) || [];

  if(tagId) {
    return isEdit
      ? {
        type: 'categoryEdit',
        id: tagId
      }
      : {
        type: 'categoryDetail',
        id: tagId
      };
  }

  const [, entryId = undefined] = path.match(
    /^\/entry\/([^/]+)$/
  ) || [];

  if(entryId) {
    return {
      type: 'entryEdit',
      id: entryId
    };
  }

  return {
    type: 'notFound'
  };
}