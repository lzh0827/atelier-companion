# 衣作 Studio

给服装设计学生和日常制衣用的移动端 PWA：课业 brief、交付清单、评分自查、工艺速查、学生工具台、项目工序、部件防错、尺寸记录、面辅料清单、用料计算、照片问题记录都放在一个页面里。

新增学生工具台包含 15 个大二高频工具：截止倒排、作业预算、原型公式、缩比换算、纸样件数、缝份预设、试穿诊断、讲评反馈、作品拍摄、汇报节奏、小样矩阵、色卡板、纸样标签、工序避坑、面料性格判断。

## 本地运行

需要 Node.js 20 或更高版本。

```bash
node server.js
```

打开：

```text
http://localhost:5196
```

## 上线

这个项目可以直接部署到 Vercel、Render、Railway、Zeabur 等支持 Node 或静态站点的平台。

当前 GitHub Pages 地址：

```text
https://lzh0827.github.io/atelier-companion/
```

Vercel：

```bash
npx vercel --prod
```

也可以把 `public` 目录作为静态站点发布。发布后，手机浏览器打开网址即可添加到主屏幕。
