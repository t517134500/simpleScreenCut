# simpleScreenCut

用于快速生成复杂效果的3d贴图
# 引入方法
#### 1.npm 引入
npm
```
$npm install simple-screen-cut
```
javascript
```javascript
import 'simple-screen-cut'; // 源码
import 'simpleScreenCut/dist/simpleScreenCut.min';// 打包过后的代码
```
#### 2.直接下载
下载 `dist`文件夹下的`simpleScreenCut.min.js`;script标签引入
# 调用方法
直接调用方法
```
screenCut(dom [HTMLColection], callback [function], size [Object:{width,height}]);
```
调用`screenCut`传入参数：
`dom`: html对象
`callback`: 回调函数，将传入base64格式的地址。
`size`: dom对象大小参数(非必填);