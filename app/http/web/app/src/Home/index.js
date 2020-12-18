import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Grid from '@material-ui/core/Grid';


import NavBar from "../NavBar"
// import Goals from "../Goals"

import APIClient from '../apiClient'


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 5
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'right',
    color: theme.palette.text.secondary,
  },
});

class Home extends React.Component {
  state = {
    value: 0,
    repos: [],
    kudos: []
  };

  // async componentDidMount() {
    // const accessToken = await this.props.authService.getAccessToken()
    // this.apiClient = new APIClient();
    // this.apiClient.getKudos().then((data) =>
    //   this.setState({...this.state, kudos: data})
    // );
  // }

  // handleTabChange = (event, value) => {
  //   this.setState({ value });
  // };

  // handleTabChangeIndex = index => {
  //   this.setState({ value: index });
  // };

  // resetRepos = repos => this.setState({ ...this.state, repos })

  // isKudo = repo => this.state.kudos.find(r => r.id === repo.id)
  //   onKudo = (repo) => {
  //     this.updateBackend(repo);
  // }

  // updateBackend = (repo) => {
  //   if (this.isKudo(repo)) {
  //     this.apiClient.deleteKudo(repo);
  //   } else {
  //     this.apiClient.createKudo(repo);
  //   }
  //   this.updateState(repo);
  // }

  // updateState = (repo) => {
  //   if (this.isKudo(repo)) {
  //     this.setState({
  //       ...this.state,
  //       kudos: this.state.kudos.filter( r => r.id !== repo.id )
  //     })
  //   } else {
  //     this.setState({
  //       ...this.state,
  //       kudos: [repo, ...this.state.kudos]
  //     })
  //   }
  // }

  onNav = (event) => {
    const target = event.target;
    if (!target.value || target.length < 3) { return }
    if (event.which !== 13) { return }

    // githubClient(target.value)
    //   .then((response) => {
    //     target.blur();
    //     this.setState({ ...this.state, value: 1 });
    //     this.resetRepos(response.items);
    //   })
  }
  
  // renderRepos = (repos) => {
  //   if (!repos) { return [] }
  //   return repos.map((repo) => {
  //     return (
  //       <Grid item xs={12} md={3} key={repo.id}>
  //         <GithubRepo onKudo={this.onKudo} isKudo={this.isKudo(repo)} repo={repo} />
  //       </Grid>
  //     );
  //   })
  // }

  render() {
    return (
      <div className={styles.root}>
        <NavBar onNav={this.onNav} />
        <Tabs
          value={this.state.value}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {/* <Tab label="Goals" />
          <Tab label="Datasets" /> */}
        </Tabs>

        {/* <Goals onNav={this.onNav} />
        <Tabs
          value={this.state.value}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        > */}

        {/* </Tabs> */}
      
        {/* <SwipeableViews
          axis={'x-reverse'}
          index={this.state.value}
          onChangeIndex={this.handleTabChangeIndex}
        >
          <Grid container spacing={10} style={{padding: '20px 0'}}>
            { this.renderRepos(this.state.kudos) }
          </Grid>
          <Grid container spacing={10} style={{padding: '20px 0'}}>
            { this.renderRepos(this.state.repos) }
          </Grid>
        </SwipeableViews> */}
      </div>
    );
  }
}

export default withStyles(styles)(Home);