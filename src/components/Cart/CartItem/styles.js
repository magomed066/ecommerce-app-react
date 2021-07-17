import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
	cardMedia: {
		height: 260,
	},
	cardContent: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	cardActions: {
		justifyContent: 'space-between',
	},
	buttons: {
		display: 'flex',
		alignItems: 'center',
	},
	cardTitle: {
		display: 'block',
		width: '170px',
		textOverflow: 'ellipsis',

		whiteSpace: 'nowrap',
		overflow: 'hidden',
	},
}))
