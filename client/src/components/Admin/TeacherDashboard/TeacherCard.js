import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { formatDateTime } from '../../../utils/dateTime';
import KlassListItem from './KlassListItem';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function TeacherCard({ teacher, startDate }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function renderTeacherKlasses() {
    return teacher.klasses.map(klass => <KlassListItem klass={klass} key={klass.id} />)
  }

  // TODO remove hardcoded string Wildflowers Yoga Studio
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {teacher.name[0].toUpperCase()} 
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={teacher.name}
        subheader={"Teaching since " + formatDateTime(startDate)}
        titleTypographyProps={{variant: "h5"}}
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title={teacher.name + " at WildFlowers Yoga Studio" }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Description about teacher goes here.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Typography variant="body2" color="textSecondary" component="p">
            View Classes
          </Typography>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6" align="center">Classes Taught</Typography>
          <Typography variant="subtitle2" align="center">Click on a class to view or edit</Typography>
          <Typography paragraph>
            { renderTeacherKlasses() }
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default TeacherCard;
