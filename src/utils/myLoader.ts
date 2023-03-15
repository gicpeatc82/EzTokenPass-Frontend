import { server } from '../data/node_envData';
import { ImageLoaderProps } from 'next/image';

export const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${server}${src}?w=${width}&q=${quality || 75}`;
};

export const urlLoader = ({ src, width }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${75}`;
};
