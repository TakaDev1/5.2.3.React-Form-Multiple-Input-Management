# 5.2.3.React-Controlled-Components-Password-Validation

## 概要

React の **Controlled コンポーネント**を使って、パスワード入力フォームを作成する。

ユーザーがパスワードを入力するたびに文字数を判定し、条件に応じたメッセージをリアルタイムで表示する。

また、メッセージの内容に応じて TailwindCSS の文字色を変更する。

---

## 課題

Controlled コンポーネントを使い、**パスワード入力フォーム**を作成してください。

ユーザーが入力するたびに、以下の条件に応じたメッセージをリアルタイムで表示します。

| パスワードの文字数   | メッセージ  | 色  |
| ----------- | ------ | -- |
| 8文字未満       | 短すぎます  | 赤  |
| 8文字以上16文字未満 | 良い長さです | 青  |
| 16文字以上      | 長すぎます  | 黄色 |

### 条件

1. `useState` でパスワードを管理する
2. 入力に応じてメッセージを自動更新する
3. TailwindCSS でメッセージ部分の色を変更する

   * 短い → 赤
   * 良い → 青
   * 長い → 黄色


---

## 完成イメージ

パスワードを入力すると、文字数に応じてメッセージが変化する。

```text
パスワード: [ ******** ]

短すぎます
```

8文字以上になると、

```text
パスワード: [ ******** ]

良い長さです
```

16文字以上になると、

```text
パスワード: [ **************** ]

長すぎます
```

---

## 学習内容

* Controlled コンポーネント
* `useState`
* `onChange`
* `React.ChangeEvent<HTMLInputElement>`
* `event.target.value`
* 文字列の `length`
* 条件分岐
* 三項演算子
* TailwindCSS の条件付きクラス
* カスタムフック
* State の更新タイミング

---

## ディレクトリ構成

```text
src/
├── hooks/
│   └── usePasswordValidation.ts
├── pages/
│   └── PasswordValidation.tsx
├── App.tsx
├── index.css
└── main.tsx
```

### ファイルの役割

#### `hooks/usePasswordValidation.ts`

パスワードの State 管理と文字数に応じたメッセージ判定を担当する。

#### `pages/Problem3.tsx`

パスワード入力フォームとメッセージを表示する。

#### `App.tsx`

`Problem3` を表示する。

---

## 実装例

### `hooks/usePasswordValidation.ts`

```ts
import { useState } from "react";

const usePasswordValidation = () => {
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handlePassword = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    setPassword(value);

    if (value.length < 8) {
      setMessage("短すぎます");
    } else if (value.length < 16) {
      setMessage("良い長さです");
    } else {
      setMessage("長すぎます");
    }
  };

  return {
    password,
    message,
    handlePassword,
  };
};

export default usePasswordValidation;
```

---

### `pages/Problem3.tsx`

```tsx
import usePasswordValidation from "../hooks/usePasswordValidation";

const Problem3 = () => {
  const {
    password,
    message,
    handlePassword,
  } = usePasswordValidation();

  return (
    <div>
      <label htmlFor="password" className="text-white">
        パスワード:{" "}
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePassword}
          className="border p-2"
        />
      </label>

      <div>
        <p
          className={
            password.length < 8
              ? "text-red-500"
              : password.length < 16
                ? "text-blue-500"
                : "text-yellow-500"
          }
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default Problem3;
```

---

## Controlled コンポーネント

今回の `input` は、

```tsx
<input
  type="password"
  value={password}
  onChange={handlePassword}
/>
```

という形になっている。

`value` に State を指定しているため、React が入力値を管理する Controlled コンポーネントになっている。

処理の流れは以下の通り。

```text
ユーザーが入力
      ↓
onChange
      ↓
handlePassword
      ↓
event.target.value
      ↓
setPassword()
      ↓
password 更新
      ↓
再レンダリング
      ↓
メッセージ・文字色更新
```

---

## パスワードの文字数判定

```ts
if (value.length < 8) {
  setMessage("短すぎます");
} else if (value.length < 16) {
  setMessage("良い長さです");
} else {
  setMessage("長すぎます");
}
```

判定条件は以下の通り。

```text
0〜7文字
↓
短すぎます

8〜15文字
↓
良い長さです

16文字以上
↓
長すぎます
```

---

## TailwindCSS による色変更

メッセージ部分では三項演算子を使ってクラスを切り替える。

```tsx
className={
  password.length < 8
    ? "text-red-500"
    : password.length < 16
      ? "text-blue-500"
      : "text-yellow-500"
}
```

条件とクラスの対応は以下の通り。

```text
8文字未満
↓
text-red-500

8文字以上16文字未満
↓
text-blue-500

16文字以上
↓
text-yellow-500
```

---

## State 更新時の注意点

以下のように、

```ts
setPassword(value);

if (password.length < 8) {
  // ...
}
```

`setPassword()` の直後に `password` を使って判定すると、入力したばかりの最新値ではなく、更新前の値を参照することがある。

そのため、今回の実装では、

```ts
const value = event.target.value;
```

で最新の入力値を取得し、その `value` を使って判定している。

```ts
setPassword(value);

if (value.length < 8) {
  setMessage("短すぎます");
}
```

---

## 起動方法

```bash
npm run dev
```

ブラウザで表示されたURLにアクセスする。

---

## 確認項目

* [ ] `useState` でパスワードを管理している
* [ ] `value={password}` で Controlled コンポーネントにしている
* [ ] `onChange` で入力値を取得している
* [ ] `event.target.value` を使用している
* [ ] 8文字未満で「短すぎます」と表示される
* [ ] 8文字以上16文字未満で「良い長さです」と表示される
* [ ] 16文字以上で「長すぎます」と表示される
* [ ] メッセージの色が条件によって変化する
* [ ] `text-red-500` を使用している
* [ ] `text-blue-500` を使用している
* [ ] `text-yellow-500` を使用している
* [ ] カスタムフックにロジックを分離している
