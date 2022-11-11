import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { query as q } from 'faunadb'
import { fauna } from '../../lib/fauna'
import { stripe } from '../../lib/stripe'

interface User {
    ref: {
        id: string
    }
    data: {
        stripe_customer_id: string
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { priceId } = req.body
    
    if(req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed.' })
    }

    if(!priceId) {
        return res.status(400).json({ error: 'Price ID not found.' })
    }

    const session = await getSession({ req })

    const user = await fauna.query<User>(
        q.Get(
            q.Match(
                q.Index('user_by_email'),
                q.Casefold(session.user.email)
            )
        )
    )

    let customerId = user.data.stripe_customer_id

    if(!customerId) {
        const stripeCustomer = await stripe.customers.create({
            email: session.user.email,
            // metadata
        })
    
        await fauna.query(
            q.Update(
                q.Ref(
                    q.Collection('users'),
                    user.ref.id
                ),
                {
                    data: {
                        stripe_customer_id: stripeCustomer.id,
                    }
                }
            )
        )

        customerId = stripeCustomer.id
    }

    const stripeSuccessUrl = `${process.env.NEXT_URL}/posts`
    const stripeCancelUrl = `${process.env.NEXT_URL}/`

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        line_items: [{
            price: priceId,
            quantity: 1
        }],
        mode: 'subscription',
        allow_promotion_codes: true,
        success_url: stripeSuccessUrl,
        cancel_url: stripeCancelUrl
    })

    return res.status(201).json({
        checkoutUrl: stripeCheckoutSession.url
    })
}