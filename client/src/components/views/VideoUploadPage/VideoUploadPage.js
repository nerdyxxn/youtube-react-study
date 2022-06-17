import React, { useState } from 'react';
import { Typography, Button, Form, message, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';

const { Title } = Typography;
const { TextArea } = Input;

function VideoUploadPage() {
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Drop zone */}
          <Dropzone
            onDrop={(acceptedFiles) => console.log(acceptedFiles)}
            multiple
            maxSize
          >
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: '300px',
                  height: '240px',
                  border: '1px solid lightgray',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined />
              </div>
            )}
          </Dropzone>

          {/* Thumbnail */}
          <div>
            <img src alt="" />
          </div>
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input />
        <br />
        <br />
        <label>Description</label>
        <TextArea />
        <br />
        <br />
        <select>
          <option key value></option>
        </select>
        <br />
        <br />
        <select>
          <option key value></option>
        </select>
        <br />
        <br />
        <Button type="primary" size="large">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
