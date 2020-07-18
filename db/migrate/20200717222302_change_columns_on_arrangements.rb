class ChangeColumnsOnArrangements < ActiveRecord::Migration[5.2]
  def change
    add_column :arrangements, :board, :string, array: true, default: []
    remove_column :arrangements, :r1
    remove_column :arrangements, :r2
    remove_column :arrangements, :r3
    remove_column :arrangements, :r4
    remove_column :arrangements, :r5
  end
end
