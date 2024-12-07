import algoliasearch from 'algoliasearch';

const client = algoliasearch(process.env.ALGOLIA_ID , process.env.ALGOLIA_TOKEN);
const index = client.initIndex('pets');

export { index }