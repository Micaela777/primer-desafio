import algoliasearch from 'algoliasearch';

const client = algoliasearch('PX4EL4IV73', 'a2facd776ad21a8e96ac6a7de38a1c15');
const index = client.initIndex('pets');

export { index }