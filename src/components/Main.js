import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Topbar from '../TopBar';
import QuestionList from './QuestionsList/QuestionsList'

const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey['100'],
        overflow: 'hidden',
        background: `url(${backgroundShape}) no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: '0 400px',
        paddingBottom: 200
    },
    grid: {
        width: 1200,
        marginTop: 40,
        [
            theme
                .breakpoints
                .down('sm')
        ]: {
            width: 'calc(100% - 20px)'
        }
    },
    paper: {
        padding: theme.spacing.unit * 3,
        textAlign: 'left',
        color: theme.palette.text.secondary
    },
    rangeLabel: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.unit * 2
    },
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32
    },
    outlinedButtom: {
        textTransform: 'uppercase',
        margin: theme.spacing.unit
    },
    actionButtom: {
        textTransform: 'uppercase',
        margin: theme.spacing.unit,
        width: 152
    },
    blockCenter: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center'
    },
    block: {
        padding: theme.spacing.unit * 2
    },
    box: {
        marginBottom: 40,
        height: 65
    },
    inlining: {
        display: 'inline-block',
        marginRight: 10
    },
    buttonBar: {
        display: 'flex'
    },
    alignRight: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    noBorder: {
        borderBottomStyle: 'hidden'
    },
    loadingState: {
        opacity: 0.05
    },
    loadingMessage: {
        position: 'absolute',
        top: '40%',
        left: '40%'
    }
});

class Main extends Component {

    state = {
        learnMoredialog: false,
        getStartedDialog: false
    };

    componentDidMount() {}

    openDialog = (event) => {
        this.setState({learnMoredialog: true});
    }

    dialogClose = (event) => {
        this.setState({learnMoredialog: false});
    }

    openGetStartedDialog = (event) => {
        this.setState({getStartedDialog: true});
    }

    closeGetStartedDialog = (event) => {
        this.setState({getStartedDialog: false});
    }

    render() {

        return (
            <React.Fragment>
                <CssBaseline/>
                <Topbar/>
                <QuestionList/>
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(styles)(Main));
