import React from 'react';
import { StyleSheet, View, FlatList, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connectInfiniteHits } from 'react-instantsearch-native';
import Highlight from './Highlight';

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    alignItems:'center',
  },
  titleText: {
    fontWeight: 'bold',
  },
  coverImage: {
    width:36,
    height:36,
    marginRight: 6,
    borderRadius: 4,
  }
});

const InfiniteHits = ({ hits, hasMore, refineNext }) => {
  return (
    <FlatList
      data={hits}
      keyExtractor={item => item.objectID}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={() => hasMore && refineNext()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image
            style={styles.coverImage}
            source={{
              uri: item.coverUrl,
            }}
          />
          <View>
            <Highlight attribute="title" hit={item} />
            <Text>{item.artist}</Text>
          </View>
        </View>)
      }
    />
  );
};

InfiniteHits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refineNext: PropTypes.func.isRequired,
};

export default connectInfiniteHits(InfiniteHits);