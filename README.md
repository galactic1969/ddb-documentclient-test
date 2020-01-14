# ddb-documentclient-test

DynamoDBのDocumentClientにArrayを継承した独自クラスを渡すと、 `['hoge', 'fuga', 'piyo']` となって欲しいところが `{ '0': 'hoge', '1': 'fuga', '2': 'piyo' }` となってしまう件の検証用のリポジトリ。

## Node

v12.6

## packageのインストール

```sh
npm install
```

## 利用する環境変数

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION
- DDB_TABLE_NAME

## データ操作

### テーブル作成

```sh
npm run create
```

### データ挿入 & 表示

```sh
npm run insert
```

### テーブル削除

```sh
npm run delete
```

## 何が起こるか

```sh
npm run insert

> ddb-documentclient-test@0.1.0 insert /Users/xxx/ddb-documentclient-test
> npx ts-node src/insertdata.ts

{
  "id": "test1",
  "data": {
    "0": {
      "firstName": "momotaro",
      "lastName": "yamada",
      "age": 5
    },
    "1": {
      "firstName": "takashi",
      "lastName": "suzuki",
      "age": 6
    },
    "2": {
      "firstName": "koichi",
      "lastName": "sato",
      "age": 7
    }
  }
}
{
  "id": "test2",
  "data": [
    {
      "firstName": "momotaro",
      "lastName": "yamada",
      "age": 5
    },
    {
      "firstName": "takashi",
      "lastName": "suzuki",
      "age": 6
    },
    {
      "firstName": "koichi",
      "lastName": "sato",
      "age": 7
    }
  ]
}
```
