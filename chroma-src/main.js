const { OpenAI } = require('langchain/llms/openai');
const {ChromaClient, Collection} = require('chromadb');
const { ConversationalRetrievalQAChain } = require('langchain/chains')
const client = new ChromaClient();



const {OpenAIEmbeddingFunction} = require('chromadb');
const embedder = new OpenAIEmbeddingFunction({openai_api_key: "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"})


//delete collection
const delCollection = async (collectionName) => {
    var collection = await client.deleteCollection({name: collectionName})
    .then((res) => {console.log(res)})
}

//create collection
const newCollection = async (collectionName) => {
var collection = client.createCollection({name: collectionName, embeddingFunction: embedder})
    .then((res)=>{console.log(res)})
}


//get collections
const getCollections = async () => {
    var result = await client.listCollections()
    .then((res) => {console.log(res)})
}

//collection items count
const collectionItemsCount = async (collectionName) => {
    var collection = await client.getCollection({name: collectionName})
    var items = await collection.count()
    .then((res)=>{console.log(collectionName, "items:", res)})
}

//get items from collections
const getCollectionItems = async (collectionName) => {
    var collection = client.getCollection({name: collectionName})
    var items = await collection.get()
    .then((res)=>{console.log(res)})
}

//peek first 5 items from collections
const peekCollectionItems = async (collectionName) => {
    var collection = client.getCollection({name: collectionName})
    var peek = await collection.peek({ limit: 5 })
    .then((res)=>{console.log(res)})
}

const upserting = async (collectionName) => {
    var collection = client.getCollection({name: collectionName})
    const response = await collection.upsert({
        ids: ["id1", "id2"],
        embeddings: [[1, 2, 3], [4, 5, 6]],
        metadatas: [{ "key": "value" }, { "key": "value" }],
        documents: ["document1", "document2"],
      });
}

const { fs }  = require("fs"),
   { path } = require("path"),
   { util } = require("util");
var content;
console.log(content);
fs.readFile(path.join(__dirname, "helpers", "test.txt"), 'utf8', function (err, data) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    content = util.format(data, "test", "test", "test");
    console.log(content);
});


//getCollections()
//collectionItemsCount("mitrol-faq")
//getCollectionItems("mitrol-faq")
//peekCollectionItems("mitrol-faq")
//createCollection("test")