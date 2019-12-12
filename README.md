# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## userテーブル
|Column|Type|Options|
|------|----|-------|
|email|varchar|null:false|
|pass|char|null.false|
|name|varchar|null.false|
## Association
- has many:chat
- has many:group, through :user_group

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null:false|
|name|vachar|null.false|
## Association
- has many:chat
- has many:user, through :user_group

## chatテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null:false|
|image|string||
|user_id|integer|null.false|
|group_id|integer|null.false|

## user_groupテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null.false,foreign_key: true|
|group_id|integer|null.false,foreign_key: true|

## Association
- belongs_to group
- belongs_to user

