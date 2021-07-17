import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
	root: {
		maxWidth: '100%',
	},
	media: {
		height: 0,
		paddingTop: '56.25%',
	},
	actions: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	cardContent: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	cardTitle: {
		display: 'block',
		width: '170px',
		textOverflow: 'ellipsis',

		whiteSpace: 'nowrap',
		overflow: 'hidden',
	},
}))
