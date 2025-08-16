import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsPerson } from 'react-icons/bs'
import { calculateTotalAmount } from '../utils'
import { userActions } from '../store/user-slice'

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.items)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('DELIVERY_INFO')
    dispatch(userActions.clear())
    navigate('/')
  }

  const indicatorEl = cartItems.length ? (
    <span className="badge badge-sm indicator-item animate-bounce bg-primary text-white">
      {calculateTotalAmount(cartItems)}
    </span>
  ) : null

  const navLinkClasses =
    "transition-all duration-200 hover:text-primary hover:scale-105"

  const productslistEl = (
    <li>
      <NavLink className={navLinkClasses} to="/productslist">
        Products
      </NavLink>
    </li>
  )

  const contactusEl = (
    <li>
      <NavLink className={navLinkClasses} to="/contactus">
        Contact Us
      </NavLink>
    </li>
  )

  const ordersEl = user ? (
    <li>
      <NavLink className={navLinkClasses} to="/order">
        Orders
      </NavLink>
    </li>
  ) : null

  const signInEl = !user ? (
    <li>
      <NavLink className={navLinkClasses} to="/login">
        Sign in
      </NavLink>
    </li>
  ) : null

  const adminEl =
    user && user.isAdmin ? (
      <li>
        <NavLink className={navLinkClasses} to="/admin">
          Admin
        </NavLink>
      </li>
    ) : null

  const profileEl = user ? (
    <div className="dropdown dropdown-end hidden sm:block">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle text-xl font-bold hover:bg-base-200 transition-all"
      >
        <BsPerson className="text-2xl" />
      </button>
      <ul
        tabIndex={0}
        className="mt-3 p-2 shadow-lg menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <button
            className="text-error hover:bg-error hover:text-white transition-all"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  ) : null

  return (
    <div className="navbar bg-gradient-to-r from-base-100 via-base-200 to-base-100 shadow-lg sticky top-0 z-50">
      <div className="mx-auto flex flex-1 max-w-screen-xl sm:px-6 lg:px-8">
        {/* Mobile Menu */}
        <div className="sm:hidden">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-3 shadow-lg bg-base-100 rounded-box w-52 space-y-1"
            >
              {productslistEl}
              {contactusEl}
              {ordersEl}
              {adminEl}
              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error hover:bg-error hover:text-white"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  {signInEl}
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Logo */}
        <div className="flex-1 flex items-center">
          <Link to="/" className="normal-case text-lg flex items-center gap-2">
            <img
              className="h-10 w-auto sm:h-12 hover:scale-105 transition-transform"
              src="https://res.cloudinary.com/dfzlv9dkm/image/upload/v1719556518/SALC/jaw2xi1njskarvcd4y1w.png"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex">
          <ul className="menu menu-horizontal px-1 items-center gap-4">
            {productslistEl}
            {contactusEl}
            {ordersEl}
            {signInEl}
            {adminEl}
            <li>
              <NavLink to="/cart">
                <div className="indicator">
                  <AiOutlineShoppingCart className="text-2xl stroke-2" />
                  {indicatorEl}
                </div>
              </NavLink>
            </li>
          </ul>
          {profileEl}
        </div>
      </div>
    </div>
  )
}

export default Navbar
