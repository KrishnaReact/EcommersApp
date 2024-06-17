import React from 'react';
import { FlatList } from 'react-native';

const VirtualizedScrollView = props => {
  return (
    <FlatList
      data={[]}
      keyExtractor={() => "key"}
      renderItem={null}
      ListHeaderComponent={
        <>{props.children}</>
      }
    // {...props}
    // data={[]}
    // keyExtractor={(e, i) => 'dom' + i.toString()}
    // ListEmptyComponent={null}
    // renderItem={null}
    // ListHeaderComponent={() => (
    //   <>{props.children}</>
    // )}
    />
  );
};

export default VirtualizedScrollView;