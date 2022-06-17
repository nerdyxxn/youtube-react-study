import React, { useState } from 'react';
import { Typography, Button, Form, message, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

// 공개 및 비공개 설정 option을 위한 key와 value 생성
const PrivateOptions = [
  { value: 0, label: 'Private' },
  { value: 1, label: 'Public' },
];

// 카테고리 option을 위한 key와 value 생성
const CategoryOptions = [
  { value: 0, label: 'Film & Animation' },
  { value: 1, label: 'Autos & Vehicles' },
  { value: 2, label: 'Music' },
  { value: 3, label: 'Pets & Animals' },
];

function VideoUploadPage() {
  const [VideoTitle, setVideoTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState('Film  & Animation');

  // onChange func 생성
  const onTitleChange = (e) => {
    const {
      target: { value },
    } = e;
    setVideoTitle(value);
  };

  const onDescriptionChange = (e) => {
    const {
      target: { value },
    } = e;
    setDescription(value);
  };

  const onPrivateChange = (e) => {
    const {
      target: { value },
    } = e;
    setPrivate(value);
  };

  const onCategoryChange = (e) => {
    const {
      target: { value },
    } = e;
    setCategory(value);
  };

  // onDrop func 생성
  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    axios.post('/api/video/uploadfiles', formData, config).then((response) => {
      if (response.data.success) {
        // 비디오 데이터 전송 성공 시
        console.log(response.data);
      } else {
        alert('비디오 업로드를 실패했습니다!');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Drop zone */}
          <Dropzone
            accept="video/mp4"
            onDrop={onDrop}
            multiple={false}
            maxSize={1000000000}
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
        <Input onChange={onTitleChange} value={VideoTitle} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={Description} />
        <br />
        <br />
        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
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
