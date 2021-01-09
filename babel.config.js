module.exports = {
  env: {
    utils: {
      presets: [
        [
          '@babel/env',
          {
            loose: true,
            modules: false,
          },
        ],
      ],
      plugins: [
        [
          'babel-plugin-module-resolver',
          {
            root: ['element-plus'],
            alias: {
              '@element-plus': 'element-plus/lib',
            },
          },
        ],
      ],
    },
  },
  presets: ['@babel/preset-env'],
};
