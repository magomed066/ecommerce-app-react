import React, { useState, useEffect } from 'react'
import {
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
	CircularProgress,
	Divider,
	Button,
	CssBaseline,
} from '@material-ui/core'

import { Link, useHistory } from 'react-router-dom'

import { commerce } from '../../../lib/commerce'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
	const classes = useStyles()
	const [activeStep, setActiveStep] = useState(0)
	const [checkoutToken, setCheckoutToken] = useState(null)
	const [shippingData, setShippingData] = useState({})
	const history = useHistory()
	const [isFinished, setIsFinished] = useState(false)

	useEffect(() => {
		const generateToken = async () => {
			try {
				const token = await commerce.checkout.generateToken(cart.id, {
					type: 'cart',
				})

				setCheckoutToken(token)
			} catch (error) {
				history.push('/')
			}
		}

		generateToken()
	}, [cart])

	const Confirmation = () =>
		order.customer ? (
			<>
				<div>
					<Typography variant="h5">
						Thank you for your purchase, {order.customer.firstname}{' '}
						{order.customer.lastname}!
					</Typography>
					<Divider className={classes.divider} />
					<Typography variant="subtitle2">
						Order ref: {order.customer_reference}
					</Typography>
				</div>
				<br />
				<Button
					component={Link}
					to="/"
					variant="outlined"
					type="button"
				>
					Back to Home
				</Button>
			</>
		) : isFinished ? (
			<div>
				<Typography variant="h5">
					Thank you for your purchase!
				</Typography>
				<Divider className={classes.divider} />
			</div>
		) : (
			<div className={classes.spinner}>
				<CircularProgress />
			</div>
		)

	if (error)
		<>
			<Typography variant="h5">Error: {error}</Typography>
		</>

	const nextStep = () => setActiveStep((prev) => prev + 1)
	const previousStep = () => setActiveStep((prev) => prev - 1)

	const next = (data) => {
		setShippingData(data)

		nextStep()
	}

	const timeout = () => {
		setTimeout(() => {
			console.log('Hello World!')
			setIsFinished(true)
		}, 3000)
	}

	const Form = () =>
		activeStep === 0 ? (
			<AddressForm checkoutToken={checkoutToken} next={next} />
		) : (
			<PaymentForm
				checkoutToken={checkoutToken}
				nextStep={nextStep}
				backStep={previousStep}
				shippingData={shippingData}
				onCaptureCheckout={onCaptureCheckout}
				timeout={timeout}
			/>
		)

	return (
		<>
			<CssBaseline />

			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography variant="h4" align="center">
						Checkout
					</Typography>
					<Stepper
						activeStep={activeStep}
						className={classes.stepper}
					>
						{steps.map((step) => (
							<Step key={step}>
								<StepLabel>{step}</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length ? (
						<Confirmation />
					) : (
						checkoutToken && <Form />
					)}
				</Paper>
			</main>
		</>
	)
}

export default Checkout
