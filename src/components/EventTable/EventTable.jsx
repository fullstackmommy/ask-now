import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({

  icon: {
    margin: theme.spacing.unit,
    fontSize: 30
  }
});

function EventTable(props) {
  const {classes, events, handleDelete} = props
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Event Code</TableCell>
          <TableCell>Event Name</TableCell>
          <TableCell>Organizer</TableCell>
          <TableCell>Speaker</TableCell>
          <TableCell>Event Date</TableCell>
          <TableCell>Venue</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {events.map(event => (
          <TableRow key ={event.id}>
            <TableCell component="th" scope="event">{event.id}</TableCell>
            <TableCell>{event.name}</TableCell>
            <TableCell>{event.organizer}</TableCell>
            <TableCell>{event.speaker}</TableCell>
            <TableCell>{event.startDate}</TableCell>
            <TableCell>{event.venue}</TableCell>
            <TableCell><DeleteIcon className={classes.button} onClick={() => handleDelete(event.id)}/></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default withStyles(styles)(EventTable)
