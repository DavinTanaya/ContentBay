import { Link } from 'react-router-dom';
import { Button } from 'antd';

export function NavbarLanding() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-xl font-bold text-slate-900">
                ContentBay
              </span>
            </Link>

            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                to="/product"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Product
              </Link>
              <Link
                to="/resources"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Resources
              </Link>
              <Link
                to="/documentation"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Documentation
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 transition-colors"
            >
              Log in
            </Link>
            <Link to="/register">
              <Button
                type="primary"
                size="large"
                className="bg-blue-600 hover:bg-blue-700 h-10 px-6 rounded-lg font-medium"
              >
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
