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

interface NotFound {
  type: 'notFound'
}

export type Route =
  | CategoryDetail
  | CategoryEdit
  | CategoryList
  | CategoryListEdit
  | NotFound;

export function router(
  path: string
): Route {
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

  const [, id = undefined, isEdit = undefined] = path.match(
    /^\/tag\/([^/]+)(\/edit)?$/
  ) || [];

  if(id) {
    return isEdit
      ? {
        type: 'categoryEdit',
        id
      }
      : {
        type: 'categoryDetail',
        id
      };
  }

  return {
    type: 'notFound'
  };
}