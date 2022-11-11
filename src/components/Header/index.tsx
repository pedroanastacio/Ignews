import Image from 'next/image'
import { SignInButton } from '../SignInButton'
import { ActiveLink } from '../ActiveLink'

import logo from '../../../public/images/logo.svg'

import styles from './styles.module.scss'


export function Header() {

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src={logo} alt="ig.news" />

                <nav>
                    <ActiveLink href="/" legacyBehavior activeClassName={styles.active}>
                       <a>Home</a> 
                    </ActiveLink>

                    <ActiveLink href="/posts" legacyBehavior activeClassName={styles.active}>
                        <a>Posts</a> 
                    </ActiveLink>
                </nav>

                <SignInButton />
            </div>
        </header>
    )
}