import React, {useEffect} from 'react';
import axios from 'axios';
import config, { appPath } from '../config';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useQueryState, useQueryValue, useSetAllQueryState, useSetAppPath } from '../hooks/urlState';
import { Route } from "react-router-dom";
import { getStateAtom } from '../state/make';

import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import { ReactComponent as IcoSort } from '../img/icons/sort-arrows-both.svg';
import { ReactComponent as IcoSortDown } from '../img/icons/sort-down.svg';
import { ReactComponent as IcoSortUp } from '../img/icons/sort-up.svg';

import './NodeTableList.css';

const sortIcoStyle = {height: '10px', width: '10px'};

const searchFormStyles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    float: 'left'
  },
  input: {
    flex: 1,
    marginLeft: 10
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  }
};

const SortField = (props) => {
  const getSortIcon = () => {
    if ( props.field === props.sortField ) {
      if ( props.sortDirection === "order_by_desc" ) {
        return <IcoSortDown style={ sortIcoStyle } />;
      } else if ( props.sortDirection === "order_by_asc" ) {
        return <IcoSortUp style={ sortIcoStyle } />;
      }
    }
    
    return <IcoSort style={ sortIcoStyle } />;
  };

  const changeSort = () => {
    props.applySort(
      props.field,
      props.sortDirection === "order_by_desc" ? "order_by_asc" : "order_by_desc"
    );
  };
  
  return <th style={{"userSelect": "none"}} onClick={changeSort}>{props.name} {getSortIcon()}</th>;
};

const NodeTableList = (props) => {

  const user = useRecoilValue(getStateAtom('userState', null));

  const [nodes, setNodes] = useRecoilState(props.stateAtoms['nodes']);
  const perPage = useRecoilValue(props.stateAtoms['perPage']);
  const [myNodeCount, setMyNodeCount] = useRecoilState(props.stateAtoms['myNodeCount']);
  const [allNodeCount, setAllNodeCount] = useRecoilState(props.stateAtoms['allNodeCount']);
  const setLinkInfo = useSetRecoilState(getStateAtom(props.apiName + '-link-info', null));

  const sortDirection = useQueryValue('sortDirection', 'order_by_desc');
  const sortField = useQueryValue('sortField', props.defaultSortField);

  const searchField = useQueryValue('search', '');
  const [currentPageStr, setCurrentPage] = useQueryState('currentPage', 1);
  const activeTab = useQueryValue('activeTab', 'all');
  const showIdentifier = useQueryValue('show', null);
  const [showClicked, setShowClicked] = useRecoilState(getStateAtom('showClicked', false));
  const setQueryState = useSetAllQueryState();
  const setAppPath = useSetAppPath();

  const currentPage = parseInt(currentPageStr);

  const NodeTableListRow = props.trComp;
  const NodeCreatePopup = props.createPopupComp;

  useEffect(() => {
    getNumNodes(activeTab === "all" ? "my" : "all");
    // eslint-disable-next-line
  }, [activeTab, searchField, user]);

  useEffect(() => {
    axios.get(config.apiEndpoint + '/api/' + props.apiName + "/links", {
        withCredentials: true
    })
    .then((resp) => { 
      setLinkInfo(resp.data.links);
    });
    // eslint-disable-next-line
  }, [props.apiName]);

  useEffect(() => {
    refreshNodes();
    // eslint-disable-next-line
  }, [currentPage, activeTab, searchField, sortField, sortDirection]);

  const applySort = (field, direction) => {
    setQueryState({sortField: field, sortDirection: direction});
  };
  
  // TODO: create mongoDB b64 query
  const getFilterQueryString = (activeTabI, allMode = false) => {

    const searchFields = props.searchFields;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    function escapeRegExp(string) {
      return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    let queryObj = {};

    if ( activeTabI === "my" ) {
      queryObj["created_by"] = {"$eq": user.email};
    }

    if ( searchField !== "" && allMode === false ) { // disable search if all mode
      queryObj["$or"] = [];
      for ( var f of searchFields ) {
        let orObj = {};
        orObj[f] = {"$regex": escapeRegExp(searchField), "$options": 'i'};

        queryObj["$or"].push(orObj);
      }
    }

    return btoa(JSON.stringify(queryObj));
  };

  const getAPIQueryObj = (allMode = false) => {
    var offset = (currentPage - 1) * perPage;
    var first = perPage;

    if ( allMode ) first = 99999;
    if ( allMode ) offset = 0;

    let sortObj = {};

    sortObj[sortField] = (sortDirection === "order_by_desc") ? -1 : 1;

    const rObj = {
      limit: first,
      offset: offset,
      query: getFilterQueryString(activeTab, allMode),
      sort: btoa(JSON.stringify(sortObj))
    };

    if ( props.join ) {
      rObj['joinb64'] = btoa(JSON.stringify(props.join));
    }

    return rObj;
  };

  const getNumNodes = (tab = '') => {
    return axios.get(config.apiEndpoint + '/api/' + props.apiName, {
      params: {
        count: 1,
        query: getFilterQueryString(tab)
      },
      withCredentials: true
    })
    .then((resp) => { 
      if ( tab === "all" ) {
        setAllNodeCount(resp.data.count);
      } else if ( tab === "my" ) {
        setMyNodeCount(resp.data.count);
      }
    }) 
    .catch((error) => { 
      console.log(error)
      console.log("can't get " + props.plural);
    });
  };

  // allMode bypasses the limit, offset, and filter of the GraphQL query
  // Doesn't update the node count for the active tab
  // Doesn't set the nodes state object
  // When allMode is set, this function acts as a lower-level method 
  // to fetch all nodes without modifying state
  const refreshNodes = (allMode = false) => {

    var qo;
    if ( !allMode ) {
      getNumNodes(activeTab);
      qo = getAPIQueryObj();
    } else {
      qo = getAPIQueryObj(allMode);
    }

    return axios.get(config.apiEndpoint + '/api/' + props.apiName, {
      params: qo,
      withCredentials: true
    })
    .then((resp) => { 
      if ( !allMode ) setNodes(resp.data.data);

      if ( resp.data.data === null ) {
        resp.data.data = [];
      }

      return resp.data.data;
    }) 
    .catch((error) => { 
      console.log("can't get " + props.plural);
    });

  };

  const activeTabNodeCount = () => {
    if ( activeTab === "all" ) {
      return allNodeCount;
    } else if ( activeTab === "my" ) {
      return myNodeCount;
    }
  };


  const nextPage = () => {
    var np;
    if ( (currentPage) === Math.ceil(activeTabNodeCount() / perPage) ) {
      np = 1;
    } else {
      np = currentPage + 1;
    }
    setCurrentPage(np);
  };

  const prevPage = () => {
    var pp;
    if ( currentPage === 1 ) {
      pp = Math.ceil(activeTabNodeCount() / perPage);
    } else {
      pp = currentPage - 1;
    }
    setCurrentPage(pp);
  };

  const openPopup = () => {
    setAppPath(props.appPath + "/new", true);
  };

  const switchToPageAndExpandNode = (p) => {
    // refresh all nodes without limitation
    refreshNodes(true).then((allNodes) => {

      // Set [this.state.activeTab + "ProjectCount"] to length of result
      activeTabNodeCount(allNodes.length);

      // find out which page it belongs to
      let nodeIndex = allNodes.findIndex(node => {
        return node[props.nodeIdentifier] === p[props.nodeIdentifier];
      });
      if ( nodeIndex === -1 ) return; // oh snap

      var nodePage = Math.ceil(nodeIndex / perPage);
      if ( nodePage === 0 ) nodePage = 1;

      // slice result by page
      var renderNodes = allNodes.slice((nodePage - 1) * perPage, nodePage * perPage);

      // set page, set nodes
      setNodes(renderNodes);
      
      setAppPath(props.appPath, false, {
        ["expandTr-" + p[props.nodeIdentifier]]: true,
        "currentPage": nodePage,
        "sortDirection": sortDirection,
        "sortField": sortField,
        "activeTab": activeTab,
        "stpe": true
      });
    });
  };

  useEffect(() => {
    if ( showClicked ) {
      setShowClicked(false);
      switchToPageAndExpandNode({[props.nodeIdentifier]: showIdentifier})
    }
    // eslint-disable-next-line
  }, [showIdentifier, showClicked]);
  
  if ( nodes === null ) return null;

  var numPages = Math.ceil(activeTabNodeCount() / perPage);
  var pages = [];

  for ( var i = 1; i <= numPages; i++ ) {
    pages.push(i);
  }

  if ( numPages === 0 ) pages.push(1);
  if ( nodes === null ) return null; // prevent render until nodes are loaded

  return (
    <div className='node-list-view'>
      <Route
        path={[
          appPath(props.appPath + "/new/:step"),
          appPath(props.appPath + "/new")
        ]}
        render={({ match }) => {
          let stepIndex = 0;
          if ( match.params.step !== undefined ) {
            stepIndex = parseInt(match.params.step);
          }
          return <NodeCreatePopup
            stepIndex={stepIndex}
            title={'Enroll ' + props.singular}
            create={switchToPageAndExpandNode}
            {...props}
          />;
        }}
      />

      <div className='node-menu'>
        <Paper component="form" style={searchFormStyles.root}>
          <InputBase
            style={searchFormStyles.input}
            value={searchField}
            placeholder={`Search ${props.plural}...`}
            onChange={({target: {value: inputVal}}) => {
              setQueryState({search: inputVal, currentPage: 1});
            }}
          />
          <IconButton style={searchFormStyles.iconButton} type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        <Button
          variant="contained"
          color="primary"
          style={{float:'right',fontWeight:'600', backgroundColor:'#cd46c6', fontFamily: 'inherit', fontSize: '16px'}}
          startIcon={<AccountTreeIcon />}
          onClick={openPopup}
        >
          New {props.singular}
        </Button>

        <div style={{clear: 'both'}}></div>
      </div>

      <div className='node-list'>
        <div className='node-list-menu'>
          <ul className='node-list-subsets'>
            <li onClick={() => {
                setQueryState({activeTab: 'all', currentPage: 1});
              }}
              className={activeTab === "all" ? "selected" : ""}>All {props.plural} <span className="count-label">{allNodeCount}</span></li>
            <li onClick={() => {
                setQueryState({activeTab: 'my', currentPage: 1});
              }}
              className={activeTab === "my" ? "selected" : ""}>My {props.plural} <span className="count-label">{myNodeCount}</span></li>
          </ul>

          <ul className='node-list-opts'>
            <li>Showing {perPage} {props.plural}</li> 
          </ul>
        </div>
        <table className="node-list-table">
          <thead>
            <tr>
              { Object.keys(props.tableFields).map((sysField) => {
                const prettyField = props.tableFields[sysField];
                return <SortField name={prettyField} key={sysField} field={sysField} sortField={sortField} sortDirection={sortDirection} applySort={applySort} />
              }) }
            </tr>
          </thead>
          <tbody>
            { nodes.length === 0 ?
            <tr>
              <td colSpan="9" style={{textAlign: "center"}}>No {props.plural}</td>
            </tr>
            : nodes.map((node) => {
              return <NodeTableListRow refresh={refreshNodes} key={node[props.nodeIdentifier]} node={node} {...props} />;
            }) }
          </tbody>
        </table>
        <div className='node-list-table-footer'>
          <div className='node-pagination'>
            <ul>
              <li onClick={ prevPage }>&lt;</li>
              { pages.map((page) => { return <li key={page} className={currentPage === page ? 'selected' : '' } onClick={ () => setCurrentPage(page) }>{page}</li> }) }
              <li onClick={ nextPage }>&gt;</li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
}


export default NodeTableList;