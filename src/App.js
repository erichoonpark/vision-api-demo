import React, { Component } from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src='https://media1.tenor.com/images/aa12acad78c918bb62fa41cf7af8cf75/tenor.gif?itemid=5087595' className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Readr</h1>
        </header>
        <Form action='/upload' encType="multipart/form-data" method="POST">
          <FormGroup row>
            <Label for="exampleFile" sm={2}>File</Label>
            <Col sm={10}>
              <Input type='file' name='image' />
              <FormText color="muted">
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleSelect" sm={2}>What are we trying to see today in the image?</Label>
            <Col sm={10}>
              <Input type="select" name="select" id="exampleSelect">
                <option>Labels</option>
                <option>Faces</option>
                <option>Landmarks</option>
                <option>Text</option>
                <option>Logos</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button type="submit">Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default App;
