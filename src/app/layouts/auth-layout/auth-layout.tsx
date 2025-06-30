import { Outlet } from 'react-router-dom'
import styles from './auth-layout.module.scss'

export function AuthLayout() {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  )
}
