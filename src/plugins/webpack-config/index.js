import merge from 'webpack-merge'

import babel from './babel-plugin'
import base from './base-plugin'
import cssModules from './css-modules-plugin'
import defineNodeENV from './define-node-env-plugin'
import eslint from './eslint-plugin'
import json from './json-plugin'
import media from './media-plugin'
import pages from './pages-plugin'
import scss from './scss-plugin'

export const plugins = [
  babel,
  base,
  cssModules,
  defineNodeENV,
  eslint,
  json,
  media,
  pages,
  scss
]

export default function configureWebpack (config) {
  const { webpackConfig: userWebpackConfig, ...extraConfig } = config

  const defaultWebpackConfig = plugins.reduce((webpackConfig, plugin) => {
    return merge(webpackConfig, plugin(extraConfig))
  }, {})

  const webpackConfig = merge(defaultWebpackConfig, userWebpackConfig)

  return { ...config, webpackConfig }
}
