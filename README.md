# Nex-with-rails

ハッカソンに参加し、ゲーム専用の掲示板 Nex を作成しました。
ハッカソンではフロントエンドを担当して、バックエンドは触れていなかったので、Rails を使って 1 から自分で作って見ることにしました。

### Demo


https://github.com/toshiki-git/Nex-GameBulletinBoard-Rails/assets/134392452/e5689bf6-dfa7-4e36-974b-827aca0c934b





# 開発環境

- Node.js 18.17.1
- Ruby 3.2.2
- Rails 7.0.8
- PostgreSQL 15.4-bullseye

Docker の場合は以下のようなポート設定になっています。
| port | name | cotainer_name |
| - | - | - |
| 3001 | Rails | backend-rails |
| 3000 | Next.js | frontend-next |
| 5432 | PostgreSQL | db-posgres |

# 本番環境
[サイトURL](https://nex-game-bulletin-board-rails.vercel.app/login)
![Nex_技術スタック](https://github.com/toshiki-git/Nex-GameBulletinBoard-Rails/assets/134392452/d3e17dd9-e4d8-4ce6-bdbf-73b140b9f02c)


# DB のスキーマ

### User Table

- **id(PK)**: bigint
- **username**: character varying
- **email**: character varying
- **password_digest**: character varying
- **created_at**: timestamp without time zone
- **updated_at**: timestamp without time zone

### Post Table

- **id(PK)**: bigint
- **user_id(FK -> User Table)**: bigint
- **hashtags**: character varying
- **password_digest**: character varying
- **created_at**: timestamp without time zone
- **updated_at**: timestamp without time zone

### Comment Table

- **id(PK)**: bigint
- **content**: text
- **user_id(FK -> User Table)**: bigint
- **post_id(FK -> Post Table)**: bigint
- **created_at**: timestamp without time zone
- **updated_at**: timestamp without time zone

### Notification Table

- **id(PK)**: bigint
- **recipient_id(FK -> User Table)**: bigint
- **actor_id(FK -> User Table)**: bigint
- **notifiable_id(FK -> Comment Table)**: bigint
- **notifiable_type**: character varying
- **action**:character varying
- **read_at**: timestamp without time zone
- **created_at**: timestamp without time zone
- **updated_at**: timestamp without time zone




