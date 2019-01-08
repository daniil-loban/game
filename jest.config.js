module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '.*\\.js?$': 'babel-jest',
    '.*\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?)$',
  moduleFileExtensions: [
    'js',
    'json',
    'node',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|html)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
