# Nex-with-rails

ハッカソンに参加し、ゲーム専用の掲示板 Nex を作成しました。
ハッカソンではフロントエンドを担当して、バックエンドは触れていなかったので、Rails を使って 1 から自分で作って見ることにしました。

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

# DB のスキーマ

### User Table

- **id**: bigint
- **username**: character varying
- **email**: character varying
- **password_digest**: character varying
- **created_at**: timestamp without time zone
- **updated_at**: timestamp without time zone
