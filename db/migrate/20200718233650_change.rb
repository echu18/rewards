class Change < ActiveRecord::Migration[5.2]
  def change
    change_column :arrangements, :r0, :string
    change_column :arrangements, :r1, :string
    change_column :arrangements, :r2, :string
    change_column :arrangements, :r3, :string
    change_column :arrangements, :r4, :string
  end
end
