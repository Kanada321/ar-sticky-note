<h1>@react-three/xr について</h1>

# 前提
環境構築のときに下記が実行済み
docker-compose exec node npm install -D react react-dom
docker-compose exec node npm install -D @vitejs/plugin-react-refresh @vitejs/plugin-react
docker-compose exec node npm install -D typescript @types/react @types/react-dom
docker-compose exec node npm install @mui/material @emotion/react @emotion/styled
docker-compose exec node npm install -D react-router-dom @types/react-router-dom @tanstack/react-query
docker-compose exec node npm install -D sass

## レイアウトの調整
@mui/materialを使用して、レイアウトの調整を行う
https://zenn.dev/kao126/articles/bc2c96c823b9d0
https://ralacode.com/blog/post/react-material-ui/


## @react-three/xr で VR を試してみる
https://zenn.dev/tatsuyasusukida/scraps/d85f30e7acb460

パッケージの追加
--tailwind \
--eslint \
--app \
--src-dir \
--import-alias "@/*" \
--use-npm \
react-three-xr
