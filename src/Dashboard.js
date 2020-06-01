import React from 'react'

import { Link as RouterLink } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import MenuBookIcon from '@material-ui/icons/MenuBook'

import { toTitleCase } from './_helpers'

import styled from 'styled-components'
const LinkItem = styled(Link)`
  width: 100%;
  height: 5rem;
  text-align: center;
  text-decoration: none !important;
`
const PaperItem = styled(Paper)`
  padding: 1rem 0 !important;
  background-color: var(--forth-bg-color) !important;
  &:hover {
    background-color: var(--forth-hover-color) !important;
  }
`

const DASHBOARD_LINKS = [
	'pistons',
	'models',
	'cages',
	'ovens',
	'customers',
	'orders',
]

function Dashboard() {
	return (
		<Grid container spacing={3} className='w-75 mx-auto'>
			{DASHBOARD_LINKS.map((link) => (
				<Grid item lg={3} md={4} sm={6} xs={12}>
					<LinkItem component={RouterLink} to={`/${link}`}>
						<PaperItem>
              <MenuBookIcon className='w-100 font-s-25' />
              <Typography variant="h6" className='font-b-600'>{toTitleCase(link)}</Typography>
            </PaperItem>
					</LinkItem>
				</Grid>
			))}
		</Grid>
	)
}

export default Dashboard
