json.array! @arrangements do |arrangement|
  json.partial! "api/arrangements/arrangement", arrangement: arrangement
end