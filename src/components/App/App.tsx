import React, { useEffect, useState } from 'react';
import { Tag } from '../../model';
import { CategoryDetail, CategoryEdit, CategoryList, Nav } from '..';
import { useRouteContext } from '../../util/route-hooks';
import { Route, router } from '../../util/route';
import { createTag, getCategory, listTags, updateTag } from '../../data';

export interface AppProps {
};

const App: React.SFC<AppProps> = () => {
  const { route } = useRouteContext(router);
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    listTags().then(
      setTags
    );
  }, []);

  function view(route: Route) {
    switch (route.type) {
      case 'categoryList':
        return (
          <CategoryList
            categoryTags={
              tags.filter(tag => tag.parentId === '__ROOT__')
            }
            onAddCategory={
              async (value) => {
                const tag = await createTag({
                  parentId: '__ROOT__',
                  value
                });

                setTags([
                  ...tags,
                  tag
                ]);
              }
            }
          />
        );

      case 'categoryDetail':
        const detailCategory = getCategory(tags, route.id);
        return detailCategory && (
          <CategoryDetail
            categoryTag={detailCategory.category}
            onAddTag={
              async (value) => {
                const tag = await createTag({
                  parentId: detailCategory.category.id,
                  value
                });

                setTags([
                  ...tags,
                  tag
                ]);
              }
            }
            onEditTag={
              async (value) => {
                const tag = await updateTag(value);
                setTags([
                  ...tags.filter(t => t.id !== tag.id),
                  tag
                ]);
              }
            }
            tags={detailCategory.tags}
          />
        );

      case 'categoryEdit':
        const editCategory = getCategory(tags, route.id);
        return editCategory && (
          <CategoryEdit
            categoryTag={editCategory.category}
            tags={editCategory.tags}
          />
        );

      default:
        return null;
    }
  }

  return (
    <div className="c_app">
      <Nav />
      {
        view(route)
      }
    </div>
  );
}

export default App;