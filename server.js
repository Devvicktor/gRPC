"use strict";

const grpc = require("@grpc/grpc-js");
const PROTO_PATH = __dirname + "/news.proto";
const protoLoader = require("@grpc/proto-loader");

//protoLoader stub options defitions

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

let news = [
  { id: "1", title: "Note 1", body: "Content 1", postImage: "Post image 1" },
  { id: "2", title: "Note 2", body: "Content 2", postImage: "Post image 2" },
];

server.addService(newsProto.NewsService.service, {
  getAllNews: (_, callback) => {
    callback(null, { news });
  },
  AddNews: (call, callback) => {
    const _news = { id: Date.now(), ...call.request };
    news.push(_news);
    callback(null, _news);
  },
  EditNews: (call, callback),
});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);
