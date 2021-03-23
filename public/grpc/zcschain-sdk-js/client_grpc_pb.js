// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var client_pb = require('./client_pb.js');

function serialize_client_BlockChainReply(arg) {
  if (!(arg instanceof client_pb.BlockChainReply)) {
    throw new Error('Expected argument of type client.BlockChainReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_client_BlockChainReply(buffer_arg) {
  return client_pb.BlockChainReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_client_BlockChainRequest(arg) {
  if (!(arg instanceof client_pb.BlockChainRequest)) {
    throw new Error('Expected argument of type client.BlockChainRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_client_BlockChainRequest(buffer_arg) {
  return client_pb.BlockChainRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_client_ChaincodeReply(arg) {
  if (!(arg instanceof client_pb.ChaincodeReply)) {
    throw new Error('Expected argument of type client.ChaincodeReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_client_ChaincodeReply(buffer_arg) {
  return client_pb.ChaincodeReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_client_ChaincodeRequest(arg) {
  if (!(arg instanceof client_pb.ChaincodeRequest)) {
    throw new Error('Expected argument of type client.ChaincodeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_client_ChaincodeRequest(buffer_arg) {
  return client_pb.ChaincodeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// *
// @Description: peer提供的服务
// @author zhangruiyuan
// @date 2021/3/21 3:10 下午
var ChainServerService = exports.ChainServerService = {
  //  客户端请求peer处的链码
doChainCode: {
    path: '/client.ChainServer/DoChainCode',
    requestStream: false,
    responseStream: false,
    requestType: client_pb.ChaincodeRequest,
    responseType: client_pb.ChaincodeReply,
    requestSerialize: serialize_client_ChaincodeRequest,
    requestDeserialize: deserialize_client_ChaincodeRequest,
    responseSerialize: serialize_client_ChaincodeReply,
    responseDeserialize: deserialize_client_ChaincodeReply,
  },
  //  请求账本数据
blockChain: {
    path: '/client.ChainServer/BlockChain',
    requestStream: false,
    responseStream: true,
    requestType: client_pb.BlockChainRequest,
    responseType: client_pb.BlockChainReply,
    requestSerialize: serialize_client_BlockChainRequest,
    requestDeserialize: deserialize_client_BlockChainRequest,
    responseSerialize: serialize_client_BlockChainReply,
    responseDeserialize: deserialize_client_BlockChainReply,
  },
};

exports.ChainServerClient = grpc.makeGenericClientConstructor(ChainServerService);
