import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

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

function VideoUploadPage(props) {
  //state에 있는 유저의 모든 정보 가져오기
  const user = useSelector((state) => state.user);

  const [VideoTitle, setVideoTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState('Film  & Animation');
  const [FilePath, setFilePath] = useState('');
  const [Duration, setDuration] = useState('');
  const [Thumbnail, setThumbnail] = useState('');

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

  const onPrivateChange = (value) => {
    setPrivate(`selected ${value}`);
  };

  const onCategoryChange = (value) => {
    setCategory(`selected ${value}`);
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

        let variable = {
          filePath: response.data.filePath,
          fileName: response.data.fileName,
        };

        setFilePath(response.data.filePath);

        axios.post('/api/video/thumbnail', variable).then((response) => {
          if (response.data.success) {
            // 비디오 썸네일 생성 성공 시
            console.log(response.data);
            setDuration(response.data.fileDuration);
            setThumbnail(response.data.url);
          } else {
            alert('썸네일 생성에 실패했습니다!');
          }
        });
      } else {
        alert('비디오 업로드를 실패했습니다!');
      }
    });
  };

  // onSubmit func 생성
  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      privacy: Private,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: Thumbnail,
    };

    axios.post('/api/video/uploadVideo', variables).then((response) => {
      if (response.data.success) {
        // 비디오 업로드 성공 시
        message.success('비디오 업로드 성공!');
        setTimeout(() => {
          props.history.push('/');
        }, 3000);
      } else {
        alert('비디오 업로드에 실패했습니다.');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Drop zone */}
          <Dropzone onDrop={onDrop} multiple={false} maxSize={1000000000}>
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
          {Thumbnail !== '' && (
            <div>
              <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
            </div>
          )}
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={VideoTitle} />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          style={{ resize: 'none' }}
          onChange={onDescriptionChange}
          value={Description}
        />
        <br />
        <br />
        <Select defaultValue="Public" onChange={onPrivateChange}>
          {PrivateOptions.map((item, index) => (
            <Option key={index} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
        <br />
        <br />
        <Select defaultValue="Music" onChange={onCategoryChange}>
          {CategoryOptions.map((item, index) => (
            <Option key={index} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
