# Groshop Ecom developed by Seemant Kamlapuri

Groshop Ecom is an ecommerce application built using React.js, CSS, Bootstrap, Firebase, Firestore, and Firebase Authentication. It provides users with the ability to browse and purchase products online. This README.md file provides an overview of the application, its features, and instructions for setting it up and running it locally.

## Live Link 🎉
https://ecom-d57d8.web.app/

## Features

- User Registration and Authentication: Users can create an account and log in using Firebase Authentication.
- Product Catalog: Users can browse through a wide range of products in the product catalog.
- Product Search: Users can search for products based on keywords or specific categories.
- Product Details: Users can view detailed information about each product, including images, descriptions, and prices.
- Shopping Cart: Users can add products to their shopping cart and manage the quantity of each item.
- Checkout Process: Users can proceed to checkout, provide shipping and billing information, and complete the purchase.
- Order History: Users can view their order history and track the status of their orders.

## Tech Stack

The following technologies and libraries were used in the development of Groshop Ecom:

- React.js: A JavaScript library for building user interfaces.
- CSS: Used for styling and layout.
- Bootstrap: A popular CSS framework that provides responsive and customizable UI components.
- Firebase: A platform that provides various cloud-based services, including Firebase Authentication and Firestore.
- Firestore: A NoSQL cloud database provided by Firebase for storing and retrieving data.
- Firebase Authentication: Provides user registration and authentication functionality.

## Getting Started

To run the Groshop Ecom application locally, follow these steps:

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd groshop-ecom
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Create a Firebase project and set up Firestore and Firebase Authentication. Refer to the Firebase documentation for detailed instructions.

5. Obtain your Firebase configuration values (apiKey, authDomain, projectId, etc.) from the Firebase console.

6. Create a `.env` file in the root of the project and add your Firebase configuration values in the following format:

   ```
   REACT_APP_FIREBASE_API_KEY=<your-api-key>
   REACT_APP_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
   REACT_APP_FIREBASE_PROJECT_ID=<your-project-id>
   ```

7. Start the development server:

   ```
   npm start
   ```

8. Open your browser and visit `http://localhost:3000` to see the application running.

## Deployment

To deploy Groshop Ecom to a hosting provider of your choice, follow these general steps:

1. Build the production-ready optimized version of the application:

   ```
   npm run build
   ```

2. Deploy the contents of the `build` directory to your hosting provider.

3. Configure your hosting provider to serve the `index.html` file as the default file for any incoming requests.

4. Set up the necessary environment variables in your hosting provider's dashboard, including the Firebase configuration values.

5. Start your application on the hosting provider, and your Groshop Ecom application will be live.

## Contributing

Contributions to Groshop Ecom are welcome! If you find any bugs or would like to suggest new features, please open an issue or submit a pull request on the GitHub repository.

## License

The Groshop Ecom application is open-source and released under the [MIT License](LICENSE).

## Acknowledgements

The development of Groshop Ecom was inspired by the need for a modern and user-friendly ecommerce application. We would like to thank the developers of the technologies and libraries used in this project for their invaluable contributions.
