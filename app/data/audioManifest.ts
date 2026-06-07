import type { AudioLanguageCode } from './audioLanguages';

export type AudioManifestEntry = Partial<Record<AudioLanguageCode, string>>;

export const audioManifest: Record<string, AudioManifestEntry> = {
  panda: {
    zh: '/audio/zh/panda.mp3',
    en: '/audio/en/panda.mp3',
    es: 'panda.es.mp3',
    pt: 'panda.pt.mp3',
    ja: 'panda.ja.mp3',
  },
  cat: {
    zh: '/audio/zh/cat.mp3',
    en: '/audio/en/cat.mp3',
    es: 'cat.es.mp3',
    pt: 'cat.pt.mp3',
    ja: 'cat.ja.mp3',
  },
  dog: {
    zh: '/audio/zh/dog.mp3',
    en: '/audio/en/dog.mp3',
    es: 'dog.es.mp3',
    pt: 'dog.pt.mp3',
    ja: 'dog.ja.mp3',
  },
  car: {
    zh: '/audio/zh/car.mp3',
    en: '/audio/en/car.mp3',
    es: 'car.es.mp3',
    pt: 'car.pt.mp3',
    ja: 'car.ja.mp3',
  },
  cup: {
    zh: '/audio/zh/cup.mp3',
    en: '/audio/en/cup.mp3',
    es: 'cup.es.mp3',
    pt: 'cup.pt.mp3',
    ja: 'cup.ja.mp3',
  },
  book: {
    zh: '/audio/zh/book.mp3',
    en: '/audio/en/book.mp3',
    es: 'book.es.mp3',
    pt: 'book.pt.mp3',
    ja: 'book.ja.mp3',
  },
  phone: {
    zh: '/audio/zh/phone.mp3',
    en: '/audio/en/phone.mp3',
    es: 'phone.es.mp3',
    pt: 'phone.pt.mp3',
    ja: 'phone.ja.mp3',
  },
  computer: {
    zh: '/audio/zh/computer.mp3',
    en: '/audio/en/computer.mp3',
    es: 'computer.es.mp3',
    pt: 'computer.pt.mp3',
    ja: 'computer.ja.mp3',
  },
  rocket: {
    zh: '/audio/zh/rocket.mp3',
    en: '/audio/en/rocket.mp3',
    es: 'rocket.es.mp3',
    pt: 'rocket.pt.mp3',
    ja: 'rocket.ja.mp3',
  },
  camera: {
    zh: '/audio/zh/camera.mp3',
    en: '/audio/en/camera.mp3',
    es: 'camera.es.mp3',
    pt: 'camera.pt.mp3',
    ja: 'camera.ja.mp3',
  },
};
