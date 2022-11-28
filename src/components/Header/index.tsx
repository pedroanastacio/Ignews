import Image from 'next/image'
import { FiMenu } from 'react-icons/fi'
import { SignInButton } from '../SignInButton'
import { ActiveLink } from '../ActiveLink'

import logo from '../../../public/images/logo.svg'

import styles from './styles.module.scss'

interface HeaderProps {
    onShowSidebar: () => void
}

export function Header({ onShowSidebar }: HeaderProps) {

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <button className={styles.sidebarButton} onClick={onShowSidebar}>
                    <FiMenu color="#eba417" />
                </button>

                <Image src={logo} alt="ig.news" />

                <nav>
                    <ActiveLink href="/" activeClassName={styles.active}>
                       <a>Home</a> 
                    </ActiveLink>

                    <ActiveLink href="/posts" activeClassName={styles.active}>
                        <a>Posts</a> 
                    </ActiveLink>
                </nav>

                <SignInButton />
            </div>
        </header>
    )
}