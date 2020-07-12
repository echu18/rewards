class AddNameToArrangements < ActiveRecord::Migration[5.2]
  def change
    add_column :arrangements, :name, :string
  end
end
