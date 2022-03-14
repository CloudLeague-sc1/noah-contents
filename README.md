# noah Contents Repository

noahのコンテンツを記述・格納するためのリポジトリです。

## Requirements
- XSLでフォーマットされたXSD文書が閲覧可能なブラウザまたは処理系
  - Firefox でテストしています
- Node.js
- GNU Make

## Usage
### 記事を執筆する

1. `articles/{cource-name}`branchを切ってcheckoutする
2. `articles/{cource-name}.xml`ファイルを作成する
3. 記事をXML文書として記述する。
記述するXMLのスキーマは [sample.xsd](sample.xsd)を参照してください。
4. 構文をテストする `make test`
5. 記事を生成する `make generate`

このほかに、記事をプレビューするための`make serve`が利用可能です。

### 構文を変更する
1. `feature/{feature-name}` branchを切ってcheckoutする
2. `schema.xsd`を変更する。
XSDについては[この辺り](https://www.mlab.im.dendai.ac.jp/~yamada/web/xml/xmlschema.html)が日本語文書として有用かもしれません。
3. 既存の文書のテストを通す `make test`
