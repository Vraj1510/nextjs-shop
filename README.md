
# Next.js Gaming Store 🎮

Welcome to the Next.js Gaming Store repository! This project is an online gaming store developed with Next.js, TypeScript, Redux, and MongoDB. It includes features such as game count, featured and trending games, and add-to-cart functionality with secure payments through Stripe.

## Features

- **Next.js & TypeScript**: Utilized for building the front-end of the application.
- **Redux**: State management for handling complex state across the application.
- **MongoDB**: NoSQL database for storing product and user data.
- **Sanity.io**: Headless CMS for managing product updates easily.
- **Auth.js**: Secure user authentication and authorization.
- **Stripe Integration**: Secure payment processing for add-to-cart functionality.
- **Responsive Design**: Ensures a seamless experience across different devices.
- **Performance Optimization**: Tested and optimized for reliability and speed.

## Technology Stack

- **Front-end**: Next.js, TypeScript, Redux, TailwindCSS
- **Back-end**: Node.js, MongoDB
- **CMS**: Sanity.io
- **Authentication**: Auth.js
- **Payment Processing**: Stripe

## Installation

To run the Next.js Gaming Store locally, follow these steps:

### Prerequisites

Ensure you have the following installed:
- Node.js
- MongoDB
- Git

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vraj1510/nextjs-shop.git
   cd nextjs-shop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the following environment variables:
   ```env
   MONGODB_URI=your_mongodb_uri
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
   AUTH_SECRET=your_auth_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev

The application should now be running locally. Open your browser and navigate to `http://localhost:3000` to see the result.

## Usage

### Products

Manage products easily through Sanity.io. Add new games, update existing ones, and categorize them as featured or trending.

### Shopping Cart

Users can add games to their cart and proceed to checkout using Stripe for secure payment processing.

### Authentication

Secure user authentication and authorization are handled using Auth.js, ensuring that user data is protected.

## Deployment

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.


<img width="1470" alt="Screenshot 2024-07-30 at 10 12 05 PM" src="https://github.com/user-attachments/assets/47204e3a-2fe9-4fd5-820e-ca2f2036d7d0">




<img width="1470" alt="Screenshot 2024-07-30 at 10 12 26 PM" src="https://github.com/user-attachments/assets/fea8a45a-567c-470c-bc23-05b612ed7401">




<img width="1470" alt="Screenshot 2024-07-30 at 10 12 55 PM" src="https://github.com/user-attachments/assets/58f38d8d-454b-4e2d-871d-cffafa46e6c2">




<img width="1460" alt="Screenshot 2024-07-30 at 10 13 14 PM" src="https://github.com/user-attachments/assets/4cfeab49-416e-4233-83fd-6b724f320f8e">




<img width="1470" alt="Screenshot 2024-07-30 at 10 12 42 PM" src="https://github.com/user-attachments/assets/f8a8107c-bc55-454d-aa41-da9db555313f">




<img width="1452" alt="Screenshot 2024-07-30 at 10 13 29 PM" src="https://github.com/user-attachments/assets/b3a1e800-34bc-4aed-a7d8-be31686abccc">




<img width="1450" alt="Screenshot 2024-07-30 at 10 13 51 PM" src="https://github.com/user-attachments/assets/be941c24-69c0-4334-9dfd-22d01d005bd3">



<img width="1458" alt="Screenshot 2024-07-30 at 10 14 37 PM" src="https://github.com/user-attachments/assets/5ec35a43-ee0a-4660-84b1-93ad014d9a0b">




<img width="1442" alt="Screenshot 2024-07-30 at 10 19 45 PM" src="https://github.com/user-attachments/assets/155a9197-6169-46e6-8339-9796e1330373">




<img width="1124" alt="Screenshot 2024-07-30 at 10 36 48 PM" src="https://github.com/user-attachments/assets/69312ff9-7646-42c5-ad33-7ea5281a4eb3">



### Deploy on Vercel

1. Sign up for a Vercel account if you don't already have one.
2. Connect your GitHub repository to Vercel.
3. Set up your environment variables in the Vercel dashboard.
4. Deploy the application directly from the Vercel dashboard.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- The developers and contributors of Next.js, TailwindCSS, and other open-source libraries used in this project.
- The team at Sanity.io for providing a user-friendly CMS platform.

```

Replace `your_mongodb_uri`, `your_stripe_publishable_key`, `your_stripe_secret_key`, `your_sanity_project_id`, `your_sanity_dataset`, and `your_auth_secret` with your actual environment variable values. This README provides a comprehensive overview of your project, including installation instructions, usage examples, and additional information.
