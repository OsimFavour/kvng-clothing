import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom'

import { setCurrentUser } from './store/user/user.action';

import { createUserDocumentFromAuth, onAuthStateChangedListener } from './utils/firebase/firebase.utils';
import Spinner from './components/spinner/spinner.component';

const Home = lazy(() => import('./routes/home/home.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'))
const Checkout = lazy(() => import('./routes/checkout/checkout.component'))
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'))


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {

        if (user) {
            createUserDocumentFromAuth(user)
        }

        dispatch(setCurrentUser(user))
        console.log('Unsubscribe>>>>>', user);
      })

      return unsubscribe
  }, [])

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/' element={<Navigation/>} >
          <Route index element={<Home/>} />
          <Route path='auth' element={<Authentication/>} />
          <Route path='shop/*' element={<Shop/>} />
          <Route path='checkout' element={<Checkout/>} />
        </Route>
      </Routes>
    </Suspense>
  )

}

export default App;
