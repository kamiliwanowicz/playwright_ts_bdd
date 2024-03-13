module.exports = {
    require: ['ts-node/register'],
    'require-module': ['@babel/register', 'tsconfig-paths/register'],
    spec: './frontend-E2E/features/**/*.feature',
    timeout: 60000,
  };