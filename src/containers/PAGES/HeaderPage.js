/* eslint-disable no-undef */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable import/no-unresolved */
import Page from 'components/Page';
import Typography from 'components/Typography';
import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import axios from 'axios';
import { storage } from 'firebase';

class HeaderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.onChange = this.onChange.bind(this);
    const [image, setImage] = useState(null);
  }

  onChange = e => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };

  handleUpload = () => {
    const uploadTask = storage.ref(`Uploads/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref('Uploads')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
          });
      },
    );
  };

  render() {
    return (
      <form>
        <h1>File Upload</h1>
        <input type="file" name="myImage" onChange={this.onChange} />
        <button onClick={handleUpload}>Upload</button>
      </form>
    );
  }
}

export default HeaderPage;
