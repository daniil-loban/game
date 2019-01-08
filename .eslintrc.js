module.exports = {
  env: {
    browser: true,
    commonjs: true,
    jest: true
  },
  extends: ["airbnb-base", 
  "plugin:vue/essential",
  "plugin:vue/strongly-recommended", 
  "plugin:vue/recommended",
  
 ],
 parserOptions: {
  parser: 'babel-eslint',
  "ecmaVersion": 6,
  },
};
