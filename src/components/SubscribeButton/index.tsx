import { Session } from 'next-auth'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { api } from '../../lib/axios'

import styles from './styles.module.scss'

interface SessionWithActiveSubscription extends Session {
    activeSubscription: unknown
}

interface SubscribeButtonProps {
    priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {  
    const { status, data: session } = useSession()
    const router = useRouter()

    async function handleSubscribe() {
        if (status !== 'authenticated') {
            signIn('github')
            return
        }

        if((session as SessionWithActiveSubscription)?.activeSubscription) {
            router.push('/posts')
            return
        }

        try {
            const response = await api.post('/subscribe', {
                priceId
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl
        } catch(err) {
            alert('Failure to redirect to checkout!')
        }
    }

    return (
        <button 
            type="button"
            className={styles.subscribeButton}   
            onClick={handleSubscribe} 
        >
            Subscribe now
        </button>
    )
}