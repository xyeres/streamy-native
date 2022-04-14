import {SafeAreaView, View, StyleSheet, Text, StatusBar} from 'react-native';
import React, {useState} from 'react';
import algoliasearch from 'algoliasearch';
import {InstantSearch, connectStateResults} from 'react-instantsearch-native';
import SearchBox from '../components/SearchBox';
import InfiniteHits from '../components/InfiniteHits';
import {PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_SEARCH_KEY} from '@env';

const SearchScreen = () => {
  const algoliaConfig = {
    appId: PUBLIC_ALGOLIA_APP_ID,
    searchKey: PUBLIC_ALGOLIA_SEARCH_KEY,
  };

  const searchClient = algoliasearch(
    algoliaConfig.appId,
    algoliaConfig.searchKey,
  );

  const root = {
    Root: View,
    props: {
      style: {
        flex: 1,
      },
    },
  };

  const [searchState, setSearchState] = useState({});

  const onSearchStateChange = searchState => {
    setSearchState(searchState);
  };

  const NoQuery = () => {
    return (
      <View style={styles.containerCentered}>
        <Text style={styles.title}>
          Something missing?
          <Text>
            If we&apos;ve missed an item, please send us some feedback and
            we&apos;ll get it uploaded.
          </Text>
        </Text>
      </View>
    );
  };

  const Results = connectStateResults(({searchState, children}) => {
    if (searchState && searchState.query) {
      return <>{children}</>;
    }
    return <NoQuery />;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <InstantSearch
          searchClient={searchClient}
          indexName="songs"
          root={root}
          searchState={searchState}
          onSearchStateChange={onSearchStateChange}>
          <SearchBox />
          <InfiniteHits />
        </InstantSearch>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerCentered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
