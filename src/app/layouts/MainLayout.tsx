import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'

export function MainLayout() {
  return (
    <div className={styles.layout}>
      <div>header</div>
      <main className={styles.main}>
        <Outlet />
      </main>
      <div>footer</div>
    </div>
  )
}
