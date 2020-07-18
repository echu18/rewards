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
require 'test_helper'

class ArrangementTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
