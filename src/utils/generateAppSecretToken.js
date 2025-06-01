import crypto from 'crypto';

export default () => {
  return crypto.randomBytes(32).toString('hex');
}