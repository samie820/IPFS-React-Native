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
import { RefreshControl } from "react-native";
import { getAllTrainingData as GetTrainingData } from "../services/trainingData";

export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      fetching: true
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState(prevState => ({
      fetching: true
    }));
    GetTrainingData().then(response => {
      console.log(response);
      this.setState({
        dataSet: response.data,
        fetching: false
      });
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
            <NBList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.fetching}
                  onRefresh={this.getData}
                />
              }
              dataArray={this.state.dataSet}
              renderRow={item => (
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
            />
          </Content>
        )}
      </Container>
    );
  }
}

export default List;
