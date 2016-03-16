var db;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var assert = require("assert");
var Q = require('q');
MongoClient.connect(url, (err, mongodb) => {
  console.log("Connecting to mongo DB was completed!");
  db = mongodb;
});

/**
 * @param collection_name コレクション名
 * @param {json} criteria 検索条件
 * @param {json} projection 項目指定
 * @param callback コールバック関数
 * http://docs.mongodb.org/manual/reference/method/db.collection.find/
 */
function find(collection_name, criteria, projection) {
  var deferred = Q.defer();
  db.collection(collection_name, function(outer_error, collection) {
    collection.find(criteria, projection).toArray(function(inner_error, list) {
      deferred.resolve(list);
    });
  });
  return deferred.promise;
}

function isExist(collection_name, criteria, projection) {
  var deferred = Q.defer();
  find(collection_name, criteria, projection, (array) => {
    if (array.length > 0) {
      deferred.resolve(true);
    } else {
      deferred.resolve(false);
    }
  });
  return deferred.promise;
}

/**
 * @param collection_name コレクション名
 * @param {json} document 挿入ドキュメント
 * @param callback コールバック関数
 * http://docs.mongodb.org/manual/reference/method/db.collection.insert/
 */
function insert(collection_name, document, options) {
  var deferred = Q.defer();
  db.collection(collection_name, function(outer_error, collection) {
    collection.insert(document, options, function(inner_error, result) {
      deferred.resolve(result);
    });
  });
  return deferred.promise;
}

/**
 * @param collection_name コレクション名
 * @param {json} query 更新条件
 * @param {json} update_content 更新内容
 * @param {json} options オプション
 * @param callback コールバック関数
 * http://docs.mongodb.org/manual/reference/method/db.collection.update/
 */
function update(collection_name, query, update_content, options) {
  var deferred = Q.defer();
  db.collection(collection_name, function(outer_error, collection) {
    collection.update(query, update_content, options, function(inner_error, result) {
      deferred.resolve(result);
    });
  });
  return deferred.promise;
}

/**
 * @param collection_name コレクション名
 * @param {json} query 削除条件
 * @param {boolean} justOne
 * @param callback コールバック関数
 * http://docs.mongodb.org/manual/reference/method/db.collection.remove/
 */
function remove(collection_name, query, options) {
  var deferred = Q.defer();
  db.collection(collection_name, function(outer_error, collection) {
    collection.remove(query, options, function(inner_error, result) {
      deferred.resolve(result);
    });
  });
  return deferred.promise;
}

module.exports = {
  find: find,
  isExist:isExist,
  insert: insert,
  update: update,
  remove: remove
};
