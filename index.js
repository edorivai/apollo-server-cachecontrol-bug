const Koa = require('koa');
const koaBody = require('koa-bodyparser');
const Router = require('koa-router');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const { makeExecutableSchema, makeRemoteExecutableSchema, introspectSchema, mergeSchemas } = require('graphql-tools');

const books = [{ title: '1984', author: 'George Orwell'} , { title: 'The Lord of the Rings', author: 'Tolkien'}];

const schema = makeExecutableSchema({
	typeDefs: `
		schema {
			query: Query
		}
		type Query {
			books: [Book!]!
		}
		type Book {
			title: String!
			author: String!
		}
	`,
	resolvers: {
		Query: {
			books: (_, args, __, info) => {
				console.log(info.cacheControl);
				return books;
			}
		}
	}
});

const merged = mergeSchemas({ schemas: [schema] });

const app = new Koa();

app.use(koaBody());

const router = new Router();
router.post('/graphql', graphqlKoa({
	schema, // works; logs an object for info.cacheControl (at line 25)
	// schema: merged, // does not work; logs undefined for info.cacheControl (at line 25)
	context: {
		foo: 'bar'
	},
	tracing: true,
	cacheControl: true
}));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());

app.listen(3000);