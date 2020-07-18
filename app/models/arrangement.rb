# == Schema Information
#
# Table name: arrangements
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string
#  r0         :string           default(""), not null
#  r1         :string           default(""), not null
#  r2         :string           default(""), not null
#  r3         :string           default(""), not null
#  r4         :string           default(""), not null
#
class Arrangement < ApplicationRecord
    validates :name, :r0, :r1, :r2, :r3, :r4, presence: true
end
