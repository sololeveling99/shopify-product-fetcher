# Shopify Product Fetcher

A Node.js script to fetch and display product variants from a Shopify store using GraphQL.

## Prerequisites

Before running this script, ensure you have the following:

- Node.js installed on your machine
- Access to your Shopify store's Admin API
- Shopify store domain and Admin API token stored as environment variables

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set environment variables:
   - Create a `.env` file in the root directory of your project.
   - Add your Shopify store domain and Admin API token:
     ```dotenv
     SHOPIFY_STORE_DOMAIN=your-shopify-store.myshopify.com
     ADMIN_API_TOKEN=your-admin-api-token
     ```

## Usage

Run the script from the command line with the following command:
```bash
node app.js -name <product_name>
```

Replace `<product_name>` with the name of the product you want to search for on your Shopify store.

Example:
```bash
node app.js -name glove
```

## Features

- Fetches up to 10 products matching the specified name.
- Displays product titles, variant titles, and prices sorted by price.

## Error Handling

- Handles errors gracefully and logs detailed error messages when API requests fail or no products are found.

## Dependencies

- axios: For making HTTP requests to the Shopify Admin API.