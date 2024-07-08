const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const store = process.env.SHOPIFY_STORE_DOMAIN;
const adminToken = process.env.ADMIN_API_TOKEN;

async function fetchProductsByName(productName) {
  const query = `
    query($query: String!) {
      products(first: 10, query: $query) {
        edges {
          node {
            title
            variants(first: 10) {
              edges {
                node {
                  title
                  price
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = { query: productName };

  try {
    const response = await axios.post(`https://${store}/admin/api/2024-07/graphql.json`, {
      query,
      variables
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken
      }
    });

    const products = response.data.data.products.edges;

    if (products.length === 0) {
      console.log(`No products found for '${productName}'.`);
      return;
    }

    const variants = [];
    products.forEach(product => {
      product.node.variants.edges.forEach(variant => {
        variants.push({
          productTitle: product.node.title,
          variantTitle: variant.node.title,
          price: parseFloat(variant.node.price)
        });
      });
    });

    // Sort variants by price
    variants.sort((a, b) => a.price - b.price);

    // Output the results
    variants.forEach(variant => {
      console.log(`${variant.productTitle} - ${variant.variantTitle} - price $${variant.price}`);
    });

  } catch (error) {
    console.error('Error fetching products:', error.response ? error.response.data : error.message);
  }
}

// Get product name from command line arguments
const args = process.argv.slice(2);
const productNameArgIndex = args.indexOf('-name');
if (productNameArgIndex !== -1 && args[productNameArgIndex + 1]) {
  const productName = args[productNameArgIndex + 1];
  fetchProductsByName(productName);
} else {
  console.log('Usage: node app.js -name <product_name>');
}
