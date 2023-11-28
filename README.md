# API Test

```sh
  curl 'https://project-x-bot-c7545967df6c.herokuapp.com/groupId/C96a98730a8bdfc9108d4bc77792ef15e/tag' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari Line/13.18.1 LIFF' \
  -H 'Referer: https://d21c-110-170-60-76.ngrok-free.app/manage-tag?groupId=C96a98730a8bdfc9108d4bc77792ef15e' \
  --data-raw '{"tagName":"Ddd"}' \
  --compressed
```


```sh
  curl 'https://project-x-bot-c7545967df6c.herokuapp.com/groupId/C96a98730a8bdfc9108d4bc77792ef15e/tags' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari Line/13.18.1 LIFF' \
  -H 'Referer: https://d21c-110-170-60-76.ngrok-free.app/manage-tag?groupId=C96a98730a8bdfc9108d4bc77792ef15e' \
  --compressed
```