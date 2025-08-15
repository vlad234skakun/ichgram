import { useDispatch, useSelector  }   from 'react-redux' // TypedUseSelectorHook
import type { AppDispatch } from '../../redux/store'

export const useAppDispatch: () => AppDispatch = useDispatch
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector