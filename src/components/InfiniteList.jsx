import React from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import styled from "@emotion/native";

import { Page, Title, Accent } from "./Page";
import { useTheme } from "emotion-theming";

const InfiniteList = () => {
  const [loading, setLoading] = React.useState(true);
  const [pages, setPages] = React.useState([]);

  const loadMorePages = React.useCallback(async () => {
    setLoading(true);
    const content = await fetchMoreContent();
    setPages((current) => [...current, ...content]);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    loadMorePages();
  }, [loadMorePages]);

  return (
    <FlatList
      data={pages}
      renderItem={renderItem}
      onEndReached={loadMorePages}
      onEndReachedThreshold={0.15}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={loading && ListFooter}
    />
  );
};

const ListFooter = () => {
  const theme = useTheme();

  return (
    <LoadingContainer>
      <ActivityIndicator color={theme.borderColor} size="large" />
      <Title contrast>Loading....</Title>
    </LoadingContainer>
  );
};

const LoadingContainer = styled(View)`
  height: 20vh;
  background-color: ${({ theme }) => theme.secondary};
  justify-content: center;
  align-items: center;
`;

const renderItem = ({ item, index }) => (
  <Page borderBottom>
    <Title>
      {index + 1}. {item.name} loaded in{" "}
      <Accent>{item.loadTime.toFixed(2)}ms</Accent>
    </Title>
  </Page>
);

const fetchMoreContent = async (size = 10) => {
  const start = performance.now();
  await simulateWork(); // max 3s.
  const end = performance.now();

  const list = Array.from({ length: size }, () => {
    return {
      name: "Gocho",
      loadTime: end - start
    };
  });
  return list;
};

const simulateWork = (shouldFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("Simulated Failure"));
      else {
        resolve();
      }
    }, Math.min(3000, Math.random() * 5000));
  });

export default InfiniteList;
