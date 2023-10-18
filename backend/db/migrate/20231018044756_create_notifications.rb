class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.references :recipient, index: true, null: false, foreign_key: { to_table: :users }
      t.references :actor, index: true, null: false, foreign_key: { to_table: :users }
      t.datetime :read_at
      t.string :action
      t.references :notifiable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
