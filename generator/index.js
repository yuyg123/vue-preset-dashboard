module.exports = (api, options, rootOptions) => {
  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render('../template')
  // 修改 `package.json` 里的字段
  api.extendPackage({
    dependencies: {
      "core-js": "^3.6.5",
      "vue": "^2.6.11",
      "element-ui": "^2.12.0",
      "moment": "^2.24.0",
      "vue-router": "^3.1.3",
      "vuex": "^3.0.1",
      "sockjs-client": "^1.4.0",
      "stompjs": "^2.3.3",
      "postcss-px2rem": "^0.3.0",
      "px2rem-loader": "^0.1.9",
      "axios": "^0.18.0"
    },
    devDependencies: {
      "@vue/cli-plugin-babel": "^4.4.0",
      "@vue/cli-plugin-eslint": "^4.4.0",
      "@vue/cli-service": "^4.4.0",
      "babel-eslint": "^10.1.0",
      "eslint": "^6.7.2",
      "eslint-plugin-vue": "^6.2.2",
      "vue-template-compiler": "^2.6.11",
      "@vue/cli-plugin-vuex": "^4.0.0"
    },
    scripts: {
      "serve": "vue-cli-service serve",
      "build": "vue-cli-service build"
    }
  })
}
