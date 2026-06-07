# 衣作防错台

给服装设计和日常制衣用的移动端 PWA：项目工序、部件防错、尺寸记录、面辅料清单、用料计算、照片问题记录都放在一个页面里。

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

Vercel：

```bash
npx vercel --prod
```

也可以把 `public` 目录作为静态站点发布。发布后，手机浏览器打开网址即可添加到主屏幕。
