class AddRewardsToArrangements < ActiveRecord::Migration[5.2]
  def change
        add_column :arrangements, :r1, :hstore, default: {}, null: false
        add_column :arrangements, :r2, :hstore, default: {}, null: false
        add_column :arrangements, :r3, :hstore, default: {}, null: false
        add_column :arrangements, :r4, :hstore, default: {}, null: false
        add_column :arrangements, :r5, :hstore, default: {}, null: false
  end
end
