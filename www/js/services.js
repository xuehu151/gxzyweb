angular.module('starter.services', [])

.factory('locals',['$window',function($window){
      return{        //存储单个属性
        set :function(key,value){
          $window.localStorage[key]=value;
        },        //读取单个属性
        get:function(key,defaultValue){
          return  $window.localStorage[key] || defaultValue;
        },        //存储对象，以JSON格式存储
        setObject:function(key,value){
          $window.localStorage[key]=JSON.stringify(value);
        },        //读取对象
        getObject: function (key) {
          return JSON.parse($window.localStorage[key] || '{}');
        }

      }
  }])

.factory('getData', ['$http','$q',function($http,$q){  
     /* return promise=$http({
          method: "post",
          // url: "http://121.42.253.149:18820/service/common/index?token=28fa9fa2c5542688401276ef1078c59369aeeb11534d6f63c7c3b1886ab6f0c2ef051d8af4211be886354c31d61512158ad153ede1d4121f82f31cc2e2476f68a4a968e6667ea26d312aae8cc14bf5308ad5f59998a7c7eb2e2604b7f41b6618e3b482ad8856a54f1a0a564796e53f0fc5000d186243ca0e06e2bb4e5709d3925253a098abd626c923ef2b",

           url: "http://121.42.253.149:18820/service/customer/getData",
          // data: {"token":"28fa9fa2c5542688401276ef1078c59369aeeb11534d6f63c7c3b1886ab6f0c2ef051d8af4211be886354c31d61512158ad153ede1d4121f82f31cc2e2476f68a4a968e6667ea26d312aae8cc14bf5308ad5f59998a7c7eb2e2604b7f41b6618e3b482ad8856a54f1a0a564796e53f0fc5000d186243ca0e06e2bb4e5709d3925253a098abd626c923ef2b"},
          // data: {"token":"28fa9fa2c5542688401276ef1078c59369aeeb11534d6f63c7c3b1886ab6f0c2ef051d8af4211be886354c31d61512158ad153ede1d5121f82f31cc2e2476f68a4a968e6667ea26d312aae8cc14bf5308ad5f59998a7c7eb2e2604b7f41b6618e3b482ad8856a54f1a0a564796e53f0fc5000d186243ca0e06e2bb4e5709d3925253a098abd626c923ef2b"},
          // data: {},
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Auth-Token":"7_ff388b2bbbb942e8b024cc8ad8d703ea"
          }
        })*/


        var info={};
        // info.url="http://121.42.253.149:18820/service/common/index?token=28fa9fa2c5542688401276ef1078c59369aeeb11534d6f63c7c3b1886ab6f0c2ef051d8af4211be886354c31d61512158ad153ede1d4121f82f31cc2e2476f68a4a968e6667ea26d312aae8cc14bf5308ad5f59998a7c7eb2e2604b7f41b6618e3b482ad8856a54f1a0a564796e53f0fc5000d186243ca0e06e2bb4e5709d3925253a098abd626c923ef2b";
        info.token='';
        info.getInfo=function (url,token) {
          var d=$q.defer();

          $http({
            method:"post",
            url: url,
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Auth-Token": token
          },
          }).success(function (response) {
            d.resolve(response);
          })
          .error(function () {
            d.reject('error')
          });

          return d.promise
        } 

        return info;
}])

;



