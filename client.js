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

const NewsService = grpc.loadPackageDefinition(packageDefinition).NewsService;

const client = new NewsService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.getAllNews({}, (error, news) => {
  if (error) throw new error();
  console.log(news);
});
client.AddNews(
  {
    title: "Title news 3",
    body: "Body content 3",
    postImage: "Image URL here",
  },
  (error, news) => {
    if (error) throw new error();
    console.log("Successfully created a news", news);
  }
);
