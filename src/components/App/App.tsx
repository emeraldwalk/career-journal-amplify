import React, { useEffect, useState } from 'react';
import { Entry, Tag } from '../../model';
import { CategoryDetail, CategoryEdit, CategoryList, CategoryListEdit, EntryList, Nav } from '..';
import { useRouteContext } from '../../util/route-hooks';
import { router } from '../../util/route';
import { createEntry, createTag, getCategory, listEntries, listTags, newEntry, updateTag } from '../../data';
import { switchExp } from '../../util/common';

export interface AppProps {
};

const App: React.SFC<AppProps> = () => {
  const { route } = useRouteContext(router);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    listEntries().then(
      setEntries
    );
    listTags().then(
      setTags
    );
  }, []);

  return (
    <div className="c_app">
      <Nav />
      {
        switchExp(route)({
          categoryDetail: ({ id }) => {
            const detailCategory = getCategory(tags, id);
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
            )
          },
          categoryEdit: ({ id }) => {
            const editCategory = getCategory(tags, id);
            return editCategory && (
              <CategoryEdit
                categoryTag={editCategory.category}
                tags={editCategory.tags}
              />
            );
          },
          categoryList: () => (
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
          ),
          categoryListEdit: () => (
            <CategoryListEdit/>
          ),
          entryList: () => (
            <EntryList
              entries={entries}
              onAddEntry={
                async () => {
                  const entry = await createEntry(
                    newEntry()
                  );

                  setEntries([
                    ...entries,
                    entry
                  ]);
                }
              }
            />
          ),
          notFound: r => null
        })
      }
    </div>
  );
}

export default App;