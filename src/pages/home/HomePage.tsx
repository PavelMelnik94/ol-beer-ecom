import { Link } from 'react-router-dom'
import styles from './HomePage.module.scss'

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Welcome to Beer App</h1>
        <p className={styles.subtitle}>
          Discover amazing craft beers from breweries around the world
        </p>
        <div className={styles.actions}>
          <Link to="/products">
            <button>Browse Beers</button>
          </Link>
          <button>
            Learn More
          </button>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Features</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>🍺 Craft Beers</h3>
            <p>Explore thousands of craft beers with detailed information</p>
          </div>
          <div className={styles.card}>
            <h3>🏭 Breweries</h3>
            <p>Discover breweries and their unique brewing stories</p>
          </div>
          <div className={styles.card}>
            <h3>🔍 Advanced Search</h3>
            <p>Filter beers by style, ABV, IBU and more criteria</p>
          </div>
        </div>
      </section>
    </div>
  )
}
