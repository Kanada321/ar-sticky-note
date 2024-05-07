<h1>@react-three/xr について</h1>

# 前提
環境構築のときに下記が実行済み
docker-compose exec node npm install -D react react-dom
docker-compose exec node npm install -D @vitejs/plugin-react-refresh @vitejs/plugin-react
docker-compose exec node npm install -D typescript @types/react @types/react-dom
docker-compose exec node npm install @mui/material @emotion/react @emotion/styled
docker-compose exec node npm install -D react-router-dom @types/react-router-dom @tanstack/react-query
docker-compose exec node npm install -D sass
--import-alias "@/*" ←　これをいれる必要があった？　（手動でtsconfig.jsonを追加している）
## レイアウトの調整
@mui/materialを使用して、レイアウトの調整を行う
https://zenn.dev/kao126/articles/bc2c96c823b9d0
https://ralacode.com/blog/post/react-material-ui/


## @react-three/xr で VR を試してみる
https://zenn.dev/tatsuyasusukida/scraps/d85f30e7acb460

パッケージの追加
docker-compose exec node npm install -D three @types/three @react-three/fiber @react-three/drei @react-three/offscreen  @react-three/xr

# iphoneはこっちじゃないと動作しない模様。。
https://zenn.dev/drumath2237/articles/ea77b9ac60795e
docker-compose exec node npm install -D three @types/three @ar-js-org/ar.js-threejs
↑はむずかしかったので、react-three-arjs を使ってみる
docker-compose exec node npm install -D @artcom/react-three-arjs
https://codesandbox.io/p/sandbox/react-three-fiber-typescript-fkdxww?file=%2Fsrc%2FApp.tsx%3A1%2C1-5%2C38


# やっぱりこっちじゃないと動作しない模様。。
https://zenn.dev/drumath2237/articles/ea77b9ac60795e
docker-compose exec node npm install -D three @types/three @ar-js-org/ar.js-threejs
docker-compose exec node npm install @tweenjs/tween.js 

# A-Frame使用版
# nodeコンテナにGitが必要（RUN apk update && apk add git）
docker-compose exec node npm install aframe aframe-react aframe-ar
docker-compose exec node npm install -D  @types/aframe
