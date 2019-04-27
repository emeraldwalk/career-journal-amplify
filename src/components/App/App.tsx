import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createTag } from '../../graphql/mutations';
import { CreateTagInput } from '../../API';

async function onCreateTag() {
  const createTagInput: CreateTagInput = {
    parentId: '__ROOT__',
    value: 'Location'
  };

  const newTag = await API.graphql(
    graphqlOperation(
      createTag,
      {
        input: createTagInput,
      },
    )
  );

  console.log('newTag:', newTag);
}

export interface AppProps {
};

const App: React.SFC<AppProps> = ({}) => (
  <div className="c_app">
    App
    <button onClick={onCreateTag}>Create Tag</button>
  </div>
);

export default App;