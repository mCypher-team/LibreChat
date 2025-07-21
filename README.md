# LibreChat - mCypher
- mCypher librechat

## 🚀 Run

### 따라가셈.

```bash
mkdir mcypher-demo
cd mcypher-demo

git clone git@github.com:mCypher-team/LibreChat.git
git clone git@github.com:mCypher-team/discordmcp.git
git clone git@github.com:mCypher-team/LibreChat-privacy.git
git clone git@github.com:mCypher-team/log-dashboard.git

cd discordmcp
npm install
npm run build
cd ..

cp LibreChat-privacy/.env LibreChat/.env
cp LibreChat-privacy/docker-compose.override.yml LibreChat/docker-compose.override.yml
cp LibreChat-privacy/librechat.yaml LibreChat/librechat.yaml

cd LibreChat
docker compose up --build -d
cd ..

cd log-dashboard
npm install
npm run start
```
