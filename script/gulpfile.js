const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const del = require('del');
const replace = require('gulp-replace');
const dist = require('./gulpfile.dist');
const example = require('./gulpfile.example');


/** `gulp build`
 * 构建
 * */
const build = gulp.series(dist.build, example.build);

/** `gulp watch`
 * 监听
 * */
const watch = gulp.parallel(dist.watch, example.watch);

/** `gulp` or `gulp dev`
 * 构建并监听
 * */
const dev = gulp.series(build, watch);

const wechatideConfig = {
  components: [],
  common: {
    propertis: {},
    events: {}
  },
  menu: [],

}

/// /////// 记得模块化拆分start

const wechatideFolder = path.join(__dirname, '../_wechatide');
// 预处理，将miniprogram_npm中的props.js的es module转换commonjs导出存在_wechatide中，方便后续用require引入
gulp.task('wechatide:pre', cb => {
  gulp.src(['miniprogram_dist/**/props.js'])
    .pipe(replace('export default props', 'module.exports = props'))
    .pipe(gulp.dest(wechatideFolder));
  cb();
});

// 清空 dist
// gulp.task('wechatide:clear', cb => {
//   del(['.wechatide.ib.json', wechatideFolder])
//   cb();
// });

function isExistFile(path) {
  return fs.existsSync(path)
}
gulp.task('wechatide:components', cb => {
  // 读取miniprogram_dist而不读取src是因为miniprogram_dist中ts文件已经转化成js文件。
  const base = path.join(__dirname, '../miniprogram_dist');

  const componentsFolder = fs.readdirSync(base);

  componentsFolder.forEach(componentName => {

    // console.log(componentName); // 可以用于处理 ”key” : “td-button”
    const component = {
      key: `t-${componentName}`,
      properties: [],
    }

    // 处理props.js
    const componentPropsFilePath = `${wechatideFolder}/${componentName}/props.js`;
    if (isExistFile(componentPropsFilePath)) {

      // eslint-disable-next-line global-require
      const componentProps = require(componentPropsFilePath);
      // component.properties = [
      //   ...test
      // ]
      Object.keys(componentProps).forEach(key => {
        const property = {}
        property.key = key;
        const value = componentProps[key];
        property.defaultValue = value.value;
        component.properties.push(property)
      })
    }

    // fs.stat(componentTypeFile, (err, stat) => {
    //   if (stat && stat.isFile()) {
    //   }
    // });

    // 处理组件json文件
    const componentJsonFilePath = `${base}/${componentName}/${componentName}.json`;
    if (isExistFile(componentJsonFilePath)) {
      const componentJsonFile = fs.readFileSync(componentJsonFilePath);
      const componentJson = JSON.parse(componentJsonFile.toString());
      console.log(componentJson);
    }

    wechatideConfig.components.push(component)
    console.log(component);
  });

  cb();
})

gulp.task('wechatide:menu', cb => {
  cb();
})

gulp.task('wechatide:common', cb => {
  cb();
})

gulp.task('wechatide:generate', cb => {
  const base = path.join(__dirname, '../');
  const data = JSON.stringify(wechatideConfig, null, 4);
  fs.writeFileSync(`${base}/.wechatide.ib.json`, data)
  cb();
})

const generate = gulp.series('wechatide:pre', gulp.parallel('wechatide:common', 'wechatide:components', 'wechatide:menu'), 'wechatide:generate')
/// /////// 记得模块化拆分end

// `gulp --tasks --gulpfile script/gulpfile.js` list tasks
module.exports = {
  dev,
  build,
  watch,
  default: dev,
  generate,
};
