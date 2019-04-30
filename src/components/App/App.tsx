import React, { useEffect, useState, useContext } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Tag } from '../../model';
import { createTag as createTagMutation } from '../../graphql/mutations';
import { listTags as listTagsQuery } from '../../graphql/queries';
import { CreateTagMutationVariables, ListTagsQueryVariables } from '../../API';
import { CategoryDetail, CategoryEdit, CategoryList, Nav } from '..';
import { useRouteContext } from '../../util/route-hooks';
import { Route, router } from '../../util/route';

async function createCategoryTag(
  value: string
) {
  const createTagVars: CreateTagMutationVariables = {
    input: {
      parentId: '__ROOT__',
      value
    }
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
                const tag = await createCategoryTag(value);
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

        return detailCategoryTag && (
          <CategoryDetail
            categoryTag={detailCategoryTag}
          />
        );

      case 'categoryEdit':
        const editCategoryTag = tags.find(tag => tag.id === route.id);
        return editCategoryTag && (
          <CategoryEdit
            categoryTag={editCategoryTag}
          />
        );

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