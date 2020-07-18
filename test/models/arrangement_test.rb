# == Schema Information
#
# Table name: arrangements
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string
#  board      :string           default([]), is an Array
#
require 'test_helper'

class ArrangementTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
