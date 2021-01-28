export interface GalleryItem {
  id: string,
  name: string;
  description: string;
  image?: string;
  dateAdded?: string;
  github?: string;
  link?: {
    name: string;
    url: string;
  };
  images?: string[];
}

export const Constants = {
  Menu: {
    Gallery: {
      name: 'Gallery',
      link: '/',
    },
    Email: {
      name: 'Email',
      link: '/',
    },
  },
  Gallery: {
    uri: '/public/img',
    Items: [
      {
        id: '1',
        name: 'Project1 1',
        description: 'some description',
        image: 'img1.jpg',
        dateAdded: undefined,
        github: 'https://github.com',
        link: {
          name: 'ronb.co',
          url:'http://ronb.co' },
        images: ['img1.jpg'],
      },
      {
        id: '2',
        name: 'Project2 2',
        description: 'some description 2 ',
        image: 'img2.jpg',
        dateAdded: undefined,
        github: 'https://github.com',
        link: undefined,
        images: ['img2.jpg'],
      },
      {
        id: '3',
        name: 'Project3 3',
        description: 'description 3',
        image: 'img3.jpg',
        dateAdded: undefined,
        github: 'https://github.com',
        link: undefined,
        images: ['img3.jpg'],
      },
    ],
  },
}
