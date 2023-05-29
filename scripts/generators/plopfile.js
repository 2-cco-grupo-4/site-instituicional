module.exports = plop => {
  plop.setGenerator('Component', {
    description: 'Create component files',
    prompts: [
      {
        message: 'What is the component name?',
        name: 'name',
        type: 'input',
      },
      {
        message: 'What complexity fits better your component?',
        choices: ['Atoms', 'Molecules', 'Organisms'],
        name: 'type',
        type: 'list',
      },
    ],
    actions: [
      {
        path: '../../src/{{ lowerCase type }}/{{ pascalCase name }}/index.js',
        templateFile: 'templates/component/index.js.hbs',
        type: 'add',
        skipIfExists: true,
      },
      {
        path: '../../src/{{ lowerCase type }}/{{ pascalCase name }}/{{ pascalCase name }}.js',
        templateFile: 'templates/component/component.js.hbs',
        type: 'add',
        skipIfExists: true,
      },
      {
        path: '../../src/{{ lowerCase type }}/{{ pascalCase name }}/{{ pascalCase name }}.styles.js',
        templateFile: 'templates/component/styles.js.hbs',
        type: 'add',
        skipIfExists: true,
      },
    ]
  })

  plop.setGenerator('Page', {
    description: 'Create page files',
    prompts: [
      {
        message: 'What is the page name?',
        name: 'name',
        type: 'input',
      }
    ],
    actions: [
      {
        path: '../../src/pages/{{ pascalCase name }}/index.js',
        templateFile: 'templates/page/index.js.hbs',
        type: 'add',
        skipIfExists: true,
      },
      {
        path: '../../src/pages/{{ pascalCase name }}/{{ pascalCase name }}.js',
        templateFile: 'templates/page/page.js.hbs',
        type: 'add',
        skipIfExists: true,
      },
      {
        path: '../../src/pages/{{ pascalCase name }}/{{ pascalCase name }}.styles.js',
        templateFile: 'templates/page/styles.js.hbs',
        type: 'add',
        skipIfExists: true,
      },
    ]
  })
}