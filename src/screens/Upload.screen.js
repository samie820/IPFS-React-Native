import React, { Component } from "react";
import { Text, View, Dimensions } from "react-native";
import {
  Button,
  Icon,
  Spinner,
  Toast,
  Input,
  Container,
  Content,
  Item,
  Form,
  Label,
  Header
} from "native-base";
import ImagePicker from "react-native-image-crop-picker";
import fileUpload from '../services/FileUpload';

const options = {
  title: "Select Training Image",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
export class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      label: "",
      loading: false
    };
  }

  extractExtension = mime => {
    const ext = mime.split("/")[1];
    return ext === "jpeg" ? "jpg" : ext;
  };

  takePicture = () => {
    ImagePicker.openPicker(options).then(image => {
      const file = {
        uri: image.path,
        name: `test-data-${image.modificationDate}.${this.extractExtension(
          image.mime
        )}`,
        type: image.mime
      };
      console.log(file);
      this.setState({
        image: file
      });
    });
  };

  displayToast = (message, type) => {
    Toast.show({
      text: message,
      position: "top",
      type: type,
      duration: 1500
    });
  };

  uploadImage = () => {
    this.toggleSpinner();
    fileUpload(this.state)
      .then(() => {
          this.toggleSpinner();
          this.displayToast("Successfully Uploaded", "success");
      })
      .catch(() => {
        this.displayToast("Upload Failed!!!", "danger");
        this.toggleSpinner();
      });
  };

  handleInputChange = text => {
    this.setState({
      label: text
    });
  };

  toggleSpinner = () => {
    this.setState(prevState => ({
      loading: !prevState.loading
    }));
  };

  render() {
    const { width, height } = Dimensions.get("window");
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "space-around",
          width
        }}
      >
        <Container>
        <Header />
          <Content>
            <Form>
              <Item floatingLabel>
              <Label>Label</Label>
                <Input
                  style={{
                    height: height / 6,
                    width: width - 10
                  }}
                  value={this.state.label}
                  onChangeText={this.handleInputChange}
                />
              </Item>
              <Button iconLeft block bordered onPress={this.takePicture}>
                <Text>Select Image</Text>
                <Icon name="md-camera" />
              </Button>
              <Button iconLeft block bordered onPress={this.uploadImage}>
                <Text>Upload Image</Text>
                <Icon name="file-upload" type="MaterialIcons"/>
              </Button>
            </Form>
            {this.state.loading && <Spinner />}
          </Content>
        </Container>
      </View>
    );
  }
}

export default Upload;
