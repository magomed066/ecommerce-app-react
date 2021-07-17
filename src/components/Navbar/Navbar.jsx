import React from 'react'

import {
	AppBar,
	Toolbar,
	IconButton,
	Badge,
	Typography,
} from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../assets/sale.png'

import useStyles from './styles'

const Navbar = ({ totalItems }) => {
	const classes = useStyles()
	const location = useLocation()

	return (
		<>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Typography
						variant="h6"
						className={classes.title}
						component={Link}
						to="/"
					>
						<img
							src={Logo}
							alt="Commerce.js"
							height="25px"
							className={classes.image}
						/>
						Shopping
					</Typography>
					<div className={classes.grow}></div>
					{location.pathname === '/' ? (
						<div className={classes.button}>
							<IconButton
								component={Link}
								to="/cart"
								aria-label="Show cart Items"
							>
								<Badge
									badgeContent={totalItems}
									color="secondary"
								>
									<ShoppingCart />
								</Badge>
							</IconButton>
						</div>
					) : null}
				</Toolbar>
			</AppBar>
		</>
	)
}

export default Navbar
