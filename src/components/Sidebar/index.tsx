import { FiArrowLeft } from 'react-icons/fi'
import { ActiveLink } from '../ActiveLink'
import { SignInButton } from '../SignInButton'

import styles from './styles.module.scss'

interface SidebarProps {
    visible: boolean
    onHidde: () => void
}

export function Sidebar({ visible, onHidde}: SidebarProps) {
    return (
        <aside className={`${styles.sidebar} ${visible ? styles.visible : ''}`}>
            <div className={styles.sidebarContent}>
                <button onClick={onHidde} className={styles.closeButton}>
                    <FiArrowLeft color="#eba417" />
                </button>

                <div>
                    <SignInButton />
                </div>

                <nav>
                    <ActiveLink href="/" activeClassName={styles.active}>
                        <a>Home</a> 
                    </ActiveLink>

                    <ActiveLink href="/posts" activeClassName={styles.active}>
                        <a>Posts</a> 
                    </ActiveLink>
                </nav>
            </div>
        </aside>
    )
}