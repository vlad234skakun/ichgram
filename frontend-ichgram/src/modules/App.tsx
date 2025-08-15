import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navigation from '../pages/Navigation.tsx'
import { selectToken, selectUser } from '../redux/slices/auth-selector.ts'
import { getCurrent } from '../redux/slices/auth-slice.ts'
import { useAppDispatch } from '../shared/hooks/hooks.ts'

function App() {
  const token = useSelector(selectToken)
  
   const dispatch = useAppDispatch()

  useEffect(()=> {
    if(token) { 
    dispatch(getCurrent())
    }
  }, [token])
	
  return (
    <>  
      <Navigation />
    </>
  )
}

export default App
