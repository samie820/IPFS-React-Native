import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List as NBList,
  ListItem,
  Text,
  Left,
  Thumbnail,
  Right,
  Button,
  Spinner,
  Body
} from "native-base";
import { RefreshControl, FlatList } from "react-native";
import { getAllTrainingData as GetTrainingData } from "../services/trainingData";

export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      fetching: true,
      pageCount: 0,
      endReached: false,
      totalCount: 0
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState(prevState => ({
      fetching: true
    }));
    GetTrainingData()
      .then(response => {
        console.log(response);
        this.setState({
          dataSet: response.data,
          totalCount: response.paging.totalCount,
          fetching: false
        });
      })
      .catch(err => {
        this.displayToast(err.message, "danger");
        this.setState({
          fetching: false
        });
      });
  };

  fetchMore = () => {
    if (this.state.totalCount > this.state.dataSet.length) {
      this.setState({
        isFetchingMore: true
      })
      GetTrainingData(this.state.pageCount + 1, null, true)
        .then(response => {
          console.log(response);
          if (response.data.length) {
            this.setState(prevState => ({
              dataSet: [...prevState.dataSet, ...response.data],
              pageCount: prevState.pageCount + 1,
              isFetchingMore: false
            }));
          } else {
            this.setState({
              endReached: true
            });
          }
        })
        .catch(err => {
          this.displayToast(err.message, "danger");
          this.setState({
            fetching: false,
            isFetchingMore: false
          });
        });
    }
  };

  displayToast = (message, type) => {
    Toast.show({
      text: message,
      position: "top",
      type: type,
      duration: 1500
    });
  };

  render() {
    return (
      <Container>
        <Header />
        {this.state.fetching ? (
          <Spinner />
        ) : (
          <Content>
            <FlatList
              onRefresh={this.getData}
              refreshing={this.state.fetching}
              data={this.state.dataSet}
              renderItem={({ item }) => (
                <ListItem key={item._id} thumbnail>
                  <Left>
                    <Thumbnail square source={{ uri: item.url }} />
                  </Left>
                  <Body>
                    <Text>{item.label}</Text>
                  </Body>
                  <Right>
                    <Button transparent>
                      <Text>View</Text>
                    </Button>
                  </Right>
                </ListItem>
              )}
              keyExtractor={item => item.url}
              onEndReached={this.fetchMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={this.state.isFetchingMore && <Spinner />}
            />
          </Content>
        )}
      </Container>
    );
  }
}

export default List;
