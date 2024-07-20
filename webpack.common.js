const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const CopyWebpackPlugin = require('copy-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const htmlWebpackPluginConfig = {
  meta: {
    viewport:
      'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
  },
  templateParameters: {
    brandName: 'ory',
  },
};

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // eslint-disable-next-line import/no-extraneous-dependencies
                plugins: () => [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Web Intermediate',
      filename: 'index.html',
      favicon: path.resolve(__dirname, 'src/public/favicon.png'),
      template: path.resolve(__dirname, 'src/views/index.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Web Intermediate',
      filename: 'user/tambah-cerita.html',
      favicon: path.resolve(__dirname, 'src/public/favicon.png'),
      template: path.resolve(__dirname, 'src/views/user/tambah-cerita.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Web Intermediate',
      filename: 'user/edit-story.html',
      favicon: path.resolve(__dirname, 'src/public/favicon.png'),
      template: path.resolve(__dirname, 'src/views/user/edit-cerita.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Web Intermediate',
      filename: 'user/dasbor.html',
      favicon: path.resolve(__dirname, 'src/public/favicon.png'),
      template: path.resolve(__dirname, 'src/views/user/dasbor.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Web Intermediate',
      filename: 'user/akun.html',
      favicon: path.resolve(__dirname, 'src/public/favicon.png'),
      template: path.resolve(__dirname, 'src/views/user/akun.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Web Intermediate',
      filename: 'user/pengaturan.html',
      favicon: path.resolve(__dirname, 'src/public/favicon.png'),
      template: path.resolve(__dirname, 'src/views/user/pengaturan.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Web Intermediate',
      filename: 'auth/login.html',
      favicon: path.resolve(__dirname, 'src/public/favicon.png'),
      template: path.resolve(__dirname, 'src/views/auth/login.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Web Intermediate',
      filename: 'auth/register.html',
      favicon: path.resolve(__dirname, 'src/public/favicon.png'),
      template: path.resolve(__dirname, 'src/views/auth/register.html'),
      ...htmlWebpackPluginConfig,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};
