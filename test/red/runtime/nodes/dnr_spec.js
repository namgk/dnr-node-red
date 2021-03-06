/**
 * Copyright 2014 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

var should = require("should");
var clone = require("clone");

var dnr = require("../../../../red/runtime/nodes/dnr");
var testData = require('./dnr_test_data');

describe("dnr tests", function() {
  before(function() {
    dnr.init({deviceId: '1880'});
  });

  describe("forwardWires tests", function() {
    it('parse a config into a map of nodes and their outputs',function() {
      var forwardWires = dnr.extractForwardWires(testData.test0);

      forwardWires.should.have.a.property('43277438.bcd88c');
      forwardWires.should.have.a.property('145363b5.ebac9c');
      forwardWires.should.have.a.property('a91a500b.56e5b');
      forwardWires.should.have.a.property('c3bc33f0.3c43d');
      forwardWires.should.have.a.property('278862df.d8779e');
      forwardWires.should.have.a.property('1c5f02c8.e3a0fd');
      forwardWires.should.not.have.a.property('87b76213.7848a');
      forwardWires.should.not.have.a.property('4d531157.b2acf');
      forwardWires.should.not.have.a.property('73782328.8c87dc');

      forwardWires['43277438.bcd88c'].should.be.an.Array.with.lengthOf(1);
      forwardWires['43277438.bcd88c'][0].should.be.an.Array.with.lengthOf(3);

      forwardWires['145363b5.ebac9c'].should.be.an.Array.with.lengthOf(1);
      forwardWires['145363b5.ebac9c'][0].should.be.an.Array.with.lengthOf(2);

      forwardWires['a91a500b.56e5b'].should.be.an.Array.with.lengthOf(2);
      forwardWires['a91a500b.56e5b'][0].should.be.an.Array.with.lengthOf(1);
      forwardWires['a91a500b.56e5b'][1].should.be.an.Array.with.lengthOf(2);
    });
  });

  describe("reverseWires tests", function() {
    it('parse a config into a map of nodes and their inputs',function() {
      var reverseWires = dnr.extractReverseWires(testData.test0);

      reverseWires.should.not.have.a.property('43277438.bcd88c');
      reverseWires.should.not.have.a.property('1c5f02c8.e3a0fd');
      reverseWires.should.have.a.property('145363b5.ebac9c');
      reverseWires.should.have.a.property('a91a500b.56e5b');
      reverseWires.should.have.a.property('c3bc33f0.3c43d');
      reverseWires.should.have.a.property('278862df.d8779e');
      reverseWires.should.have.a.property('87b76213.7848a');
      reverseWires.should.have.a.property('4d531157.b2acf');
      reverseWires.should.have.a.property('73782328.8c87dc');

      reverseWires['87b76213.7848a'].should.be.an.Array.with.lengthOf(3);
      reverseWires['a91a500b.56e5b'].should.be.an.Array.with.lengthOf(2);
      reverseWires['278862df.d8779e'].should.be.an.Array.with.lengthOf(1);

    });
  });

  describe("dnrizing tests", function() {
    it('dnrized config should contain a mqtt broker config, and necessary mqtt ins and outs',function() {
      
      var dnrizedConfig = dnr.dnrizeConfig(testData.test0);
      dnrizedConfig.should.have.length(11);

      dnrizedConfig = dnr.dnrizeConfig(testData.test1);
      dnrizedConfig.should.have.length(7);

      dnrizedConfig = dnr.dnrizeConfig(testData.test2);
      dnrizedConfig.should.have.length(5);

      dnrizedConfig = dnr.dnrizeConfig(testData.test3);
      dnrizedConfig.should.have.length(7);

      dnrizedConfig = dnr.dnrizeConfig(testData.test4);
      dnrizedConfig.should.have.length(6);

      dnrizedConfig = dnr.dnrizeConfig(testData.test5);
      dnrizedConfig.should.have.length(6);

      dnrizedConfig = dnr.dnrizeConfig(testData.test6);
      dnrizedConfig.should.have.length(7);

      dnrizedConfig = dnr.dnrizeConfig(testData.test8);
      dnrizedConfig.should.have.length(7);

      dnrizedConfig = dnr.dnrizeConfig(testData.test9);//TODO: weak test
      dnrizedConfig.should.have.length(13);
    });
  });
});
