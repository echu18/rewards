class CreateArrangements < ActiveRecord::Migration[5.2]
  def change
    create_table :arrangements do |t|

      t.timestamps
    end
  end
end
