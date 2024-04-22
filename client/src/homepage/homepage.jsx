import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className=" flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-l w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-5xl font-extrabold text-gray-900">
            Welcome!
        </h2>
        <p className="mt-2 text-center text-4xl text-gray-600">
            Hello there! This application is designed to manage customer orders and order items. We&apos;re here to streamline your workflow! Now, you can click on one of the links below to view customer orders or order items. If you have any questions, feel free to reach out. Happy working!
        </p>
        <div className="flex justify-center mt-6">
            <div className="mr-6">
            <h3 className="text-3xl font-semibold mb-2">Customer Orders:</h3>
            <ul className="text-gray-700 text-3xl">
                <li>- View All Customer Orders</li>
                <li>- Add a New Customer Order</li>
                <li>- Edit a Customer Order</li>
                <li>- Delete a Customer Order</li>
                <li>- Generate a PDF Dynamically</li>
                <li>- Authentication and authorization features to</li>
                <li>secure access to PDF generation/viewing.</li>
            </ul>
            </div>
            <div>
            <h3 className="text-3xl font-semibold mb-2">Order Items:</h3>
            <ul className="text-gray-700 text-3xl">
                <li>- View All Order Items</li>
                <li>- Add a New Order Item</li>
                <li>- Edit an Order Item</li>
                <li>- Delete an Order Item</li>
            </ul>
            </div>
        </div>
        </div>
        <div className="flex justify-center">
          <Link
            to="/customerOrders"
            className="text-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            List Customer Orders
          </Link>
          <Link
            to="/orderItems"
            className="text-center py-2 px-4 ml-5 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            List Order Items
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
