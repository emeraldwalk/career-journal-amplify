import React, { useEffect, useState, useContext } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Tag } from '../../model';
import { createTag as createTagMutation } from '../../graphql/mutations';
import { listTags as listTagsQuery } from '../../graphql/queries';
import { CreateTagInput, CreateTagMutationVariables, ListTagsQueryVariables } from '../../API';
import { CategoryDetail, CategoryEdit, CategoryList, Nav } from '..';
import { useRouteContext } from '../../util/route-hooks';
import { Route, router } from '../../util/route';

async function createTag(
  input: CreateTagInput
) {
  const createTagVars: CreateTagMutationVariables = {
    input
  };

  const result = await API.graphql(
    graphqlOperation(
      createTagMutation,
      createTagVars
    )
  ) as { data: { createTag: Tag } };

  return result.data.createTag;
}

async function listTags(): Promise<Tag[]> {
  const listTagVars: ListTagsQueryVariables = {
  };

  const result = await API.graphql(
    graphqlOperation(
      listTagsQuery,
      listTagVars
    )
  ) as { data: { listTags: { items: Tag[] } } };

  // const raw = await fetch('/mock/tags.json');
  // const result = await raw.json() as { data: { listTags: { items: Tag[] } } };

  return result.data.listTags.items;
}

export interface AppProps {
};

const App: React.SFC<AppProps> = ({}) => {
  const { route } = useRouteContext(router);
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    listTags().then(
      setTags
    );
  }, []);

  function view(route: Route) {
    switch(route.type) {
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
        const detailCategoryTag = tags.find(tag => tag.id === route.id);
        if(detailCategoryTag) {
          const detailTags = tags.filter(tag => tag.parentId === detailCategoryTag.id);
          return (
            <CategoryDetail
              categoryTag={detailCategoryTag}
              onAddTag={
                async (value) => {
                  const tag = await createTag({
                    parentId: detailCategoryTag.id,
                    value
                  });

                  setTags([
                    ...tags,
                    tag
                  ]);
                }
              }
              tags={detailTags}
            />
          );
        }

      case 'categoryEdit':
        const editCategoryTag = tags.find(tag => tag.id === route.id);
        if(editCategoryTag) {
          const editTags = tags.filter(tag => tag.parentId === editCategoryTag.id);
          return (
            <CategoryEdit
              categoryTag={editCategoryTag}
              tags={editTags}
            />
          );
        }

      default:
        return null;
    }
  }

  return (
    <div className="c_app">
      <Nav/>
      {
        view(route)
      }
    </div>
  );
}

export default App;