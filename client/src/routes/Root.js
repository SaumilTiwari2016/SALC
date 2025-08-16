// src/routes/Root.jsx
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'

const Root = () => {
  return (
    // pass Navbar as header prop so it spans full width
    <Layout header={<Navbar />}>
      {/* Centered page body */}
      <div className="mx-auto flex flex-1 max-w-screen-xl w-full px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>

      <Footer />
    </Layout>
  )
}

export default Root
