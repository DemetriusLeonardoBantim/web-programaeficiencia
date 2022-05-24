import styles from './style.module.scss';

import {ActiveLink} from '../ActiveLink'

export function Header(){
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/programa-eficiencia-logo.jpg" alt="logo-programa-eficiencia" className={styles.headerLogo} />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a className={styles.active}>Home</a>
          </ActiveLink>
          
          <ActiveLink activeClassName={styles.active} href="/equipe">
            <a className={styles.active}>Equipe</a>
          </ActiveLink>
        </nav>
      </div>
    </header>
  )
}