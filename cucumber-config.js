module.exports = {
    require: ['ts-node/register'],
    'require-module': ['@babel/register', 'tsconfig-paths/register'],
    spec: './src/features/**/*.feature',
    timeout: 60000,
  };