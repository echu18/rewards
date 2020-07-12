# == Schema Information
#
# Table name: arrangements
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  r1         :hstore           not null
#  r2         :hstore           not null
#  r3         :hstore           not null
#  r4         :hstore           not null
#  r5         :hstore           not null
#
class Arrangement < ApplicationRecord
    validates :r1, :r2, :r3, :r4, :r5, presence: true
end
