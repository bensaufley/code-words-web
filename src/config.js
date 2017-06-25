import devJson from './config/development.json';
import prodJson from './config/production.json';

const configJson = process.env.NODE_ENV === 'production' ? prodJson : devJson;

export default {
  ...configJson,
  env: process.env.NODE_ENV
};
