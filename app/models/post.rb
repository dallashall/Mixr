# == Schema Information
#
# Table name: posts
#
#  id                 :integer          not null, primary key
#  author_id          :integer          not null
#  title              :text
#  body               :text
#  source             :text
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  post_type          :string
#
# Indexes
#
#  index_posts_on_author_id  (author_id)
#

class Post < ApplicationRecord
  validates :author_id, presence: true

  has_attached_file :image, default_url: "https://s3-us-west-1.amazonaws.com/mixr-dev/posts/images/000/000/027/original/avatar.png"
  validates_attachment_content_type :image,
    content_type: [/\Aimage\/.*\Z/, 'audio/mp3',['audio/mpeg'], 'video/mp4']
  validates_attachment_size :image, in: 0..10.megabyte

  belongs_to :author,
    class_name: :User,
    primary_key: :id,
    foreign_key: :author_id

  has_many :likes


end
