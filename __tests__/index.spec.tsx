import * as React from 'react';
import { mount } from 'enzyme';

import IndexBase from '../src/pages/index';

const images: GalleryImageType[] = [
  {
    id: 0,
    name: 'test',
    base64: 'test',
    size: 123456,
  },
];

const images2: GalleryImageType[] = [
  {
    id: 0,
    name: 'test',
    base64: 'test',
    size: 123456,
  },
  {
    id: 1,
    name: 'test2',
    base64: 'test2',
    size: 1234563,
  },
];

describe('index one image', () => {
  const page = mount(<IndexBase images={images} />);
  it('renders the page', () => {
    expect(page).toMatchSnapshot();
  });
  it('renders the search', () => {
    const box = page.find('searchBar__SearchBar');
    expect(box.exists()).toBeTruthy();
  });
  it('renders the upload', () => {
    const box = page.find('uploadButton__UploadButton');
    expect(box.exists()).toBeTruthy();
  });
  it('it has one image box', () => {
    const box = page.find('imageBox__ImageBox');
    expect(box.exists()).toBeTruthy();
    expect(box.length).toEqual(1);
  });
});

describe('index two image', () => {
  const page = mount(<IndexBase images={images2} />);
  it('it has one image box', () => {
    const box = page.find('imageBox__ImageBox');
    expect(box.exists()).toBeTruthy();
    expect(box.length).toEqual(2);
  });
});
