import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import EmailConfirm from './Pages/EmailConfirm'
import ResetPassword from './Pages/ResetPassword'
import AuthLayout from './Components/AuthLayout'
import DashboardLayout from './Components/DashboardLayout'
import Dashboard from './Pages/Dashboard'
import Accounts from './Pages/Accounts'
import Transactions from './Pages/Transactions'
import Reports from './Pages/Reports'
import { Toaster } from 'react-hot-toast'
import ForgotPassword from './Pages/ForgotPassword'
import TransactionCategories from './Pages/TransactionCategories'
import TransactionSubCategories from './Pages/TransactionSubCategories'
import Budgets from './Pages/Budgets'
import CreateBudget from './Components/CreateBudget'
import RouteProtector from './Components/RouteProtector'

function App() {

  return (
    <>
      <Toaster position='top-center' toastOptions={{ duration: 5000 }} />
      <Routes>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='' index element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='email-confirm' element={<EmailConfirm />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
        </Route>
        <Route path='/' element={<DashboardLayout />} >
          <Route path='' index element={<Dashboard />} />
          <Route path='accounts' element={<Accounts />} />
          <Route path='transactions' element={<Transactions />} />
          <Route path='transactions-categories' element={<TransactionCategories />} />
          <Route path='transactions-subcategories' element={<TransactionSubCategories />} />
          <Route path='reports' element={<Reports />} />
        </Route>
        {/* <Route path='/create-budget' element={<RouteProtector />}> */}
        <Route path='/create-budget' index element={<CreateBudget />} />
        {/* </Route> */}
      </Routes>

    </>
  )
}

export default App
