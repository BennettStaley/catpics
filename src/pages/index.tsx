import React, { useState } from 'react';
import styled from 'styled-components';
import { Gutter } from '../containers/gutter';
import { SearchBar } from '../components/searchBar';
import { UploadButton } from '../components/uploadButton';
import { ImageBox } from '../components/imageBox';
import { LoadingBox } from '../components/loadingBox';
import { Typography } from '@material-ui/core';
import { useUploader } from '../hooks/useUploader';
import useFuse from 'react-use-fuse';
import axios from 'axios';
import { NightmodeSwitch } from '../components/nightmodeSwitch';

export const IndexBase = ({
  className,
  images,
}: {
  images: GalleryImageType[];
  className?: string;
}) => {
  const [_gallery, setGallery] = useState(images);

  const { loadingImage, loading, upload, error, assistiveText } = useUploader({
    onUploadComplete: newImage => {
      const newGallery = [..._gallery, newImage];
      setGallery(newGallery as GalleryImageType[]);
    },
  });

  // we only search by name
  const options = {
    keys: ['name'],
  };

  const { result, search, term } = useFuse({
    data: _gallery,
    options,
  });

  let gallery = result as GalleryImageType[];

  return (
    <div className={className}>
      <Gutter>
        <div
          css={`
            // i really love CSS-in-js provided by StyledComponents
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 64px;
            padding: 8px;
            @media screen and (max-width: 600px) {
              > div {
                margin-bottom: 16px;
              }
              flex-direction: column-reverse;
              margin-bottom: 0;
            }
          `}
        >
          <SearchBar
            onChange={(e: HandleNameChangeInterface) => {
              search(e.target.value);
            }}
            value={term}
          />
          <UploadButton
            // things that could be added:
            error={error}
            assistiveText={assistiveText}
            // loading={loading} - loading info? button state?
            // loadingText={loadingText} - should probably just be part of assistive text
            upload={upload}
          />
        </div>
        <div
          css={`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin: 0 8px 16px 8px;
            @media screen and (max-width: 600px) {
              flex-direction: column;
              align-items: flex-start;
            }
          `}
        >
          <Typography variant="h4">{_gallery.length} documents</Typography>
          <Typography variant="h6">
            Total size:{' '}
            {(
              _gallery.reduce((acc: number, { size }) => {
                return acc + size;
              }, 0) / 1024
            ).toFixed(2)}
            kb
          </Typography>
        </div>
        <div
          css={`
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            grid-gap: 16px;
            margin: 0 auto;
            padding: 8px;
          `}
        >
          {loading && loadingImage && <LoadingBox base64={loadingImage} />}
          {gallery.map(image => {
            return (
              <ImageBox
                onDelete={() => {
                  axios.post(`/delete/${image.id}`).then(({ data }) => {
                    const newGallery = _gallery.filter(
                      ({ id }) => data.id !== id,
                    );
                    setGallery(newGallery as GalleryImageType[]);
                  });
                }}
                key={image.id}
                {...image}
              />
            );
          })}
        </div>
        <NightmodeSwitch />
      </Gutter>
    </div>
  );
};

IndexBase.getInitialProps = async () => {
  const images = await axios
    .get('http://localhost:8080/images')
    .then(r => r.data);
  return { images };
};

export default styled(IndexBase)`
  width: 100%;
  height: 100%;
  @media screen and (min-width: 600px) {
    padding-top: 88px;
  }
`;
