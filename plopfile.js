module.exports = (plop) => {
  plop.setGenerator('module', {
    description: 'create a new module',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'module name',
    }],
    actions: [
      /* eslint-disable global-require, no-param-reassign */
      (data) => {
        data.name = data.name.toLowerCase().replace(/\s/gi, '-');
        data.version = require('./lerna.json').version;

        return data;
      },
      /* eslint-enable global-require, no-param-reassign */
      {
        type: 'add',
        path: 'packages/{{name}}/package.json',
        templateFile: '__templates__/module/package.json.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{name}}/webpack.config.js',
        templateFile: '__templates__/module/webpack.config.js.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{name}}/__tests__/{{dashCase name}}.spec.js',
        templateFile: '__templates__/module/__tests__/module.spec.js.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{name}}/src/index.js',
        templateFile: '__templates__/module/src/index.js.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{name}}/src/{{dashCase name}}.js',
        templateFile: '__templates__/module/src/module.js.hbs',
      },
    ],
  });
};
