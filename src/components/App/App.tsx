import React, { useEffect, useState, useContext } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Tag } from '../../model';
import { createTag } from '../../graphql/mutations';
import { listTags } from '../../graphql/queries';
import { CreateTagMutationVariables, ListTagsQueryVariables } from '../../API';
import { CategoryList, Nav } from '..';
import { useRouteContext } from '../../util/route';

async function onCreateTag() {
  const createTagVars: CreateTagMutationVariables = {
    input: {
      parentId: '__ROOT__',
      value: 'Location'
    }
  };

  const newTag = await API.graphql(
    graphqlOperation(
      createTag,
      createTagVars
    )
  );

  console.log('newTag:', newTag);
}

async function onListTags(): Promise<Tag[]> {
  const listTagVars: ListTagsQueryVariables = {
  };

  // const result = await API.graphql(
  //   graphqlOperation(
  //     listTags,
  //     listTagVars
  //   )
  // ) as { data: { listTags: { items: Tag[] } } };

  const raw = await fetch('/mock/tags.json');
  const result = await raw.json() as { data: { listTags: { items: Tag[] } } };

  return result.data.listTags.items;
}

export interface AppProps {
};

const App: React.SFC<AppProps> = ({}) => {
  const { path } = useRouteContext();
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    // fetch('https://www.google.com').finally(() => {
    //   setTags([]);
    //   console.log('Testing');
    // });
    onListTags().then(
      setTags
    );
  }, []);

  function view(path: string) {
    if(path === '/tag') {
      return (
        <CategoryList
          categoryTags={
            tags.filter(tag => tag.parentId === '__ROOT__')
          }
        />
      )
    }

    return null;
  }

  return (
    <div className="c_app">
      <Nav/>
      {
        view(path)
      }
    </div>
  );
}

export default App;