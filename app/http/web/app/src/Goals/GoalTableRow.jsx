import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { ReactComponent as IcoX } from '../img/icons/x.svg'
import Jdenticon from 'jdenticon';
import Button from '@material-ui/core/Button';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getStateAtom } from '../state/make';
import { useEffect } from 'react';
import { useSetAppPath, useQueryValue } from '../hooks/urlState';
import NodeTableRow from '../nodeTable/NodeTableRow';
import SearchIcon from '@material-ui/icons/Search';
import Chip from '@material-ui/core/Chip';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import GroupIcon from '@material-ui/icons/Group';
import StorageIcon from '@material-ui/icons/Storage';

const closeIcoStyle = {
    height: '20px',
    width: '20px',
    position: 'absolute',
    top: '25px',
    right: '0px',
    fill: 'currentColor',
    color: '#606060',
    cursor: 'pointer'
};

const Flex = forwardRef(({ expandFromClick, node, resetExpandFromClick, toggleExpand }, ref) => {
    
    const user = useRecoilValue(getStateAtom('userState', null));
    const flexRef = useRef(null);
    const setAppPath = useSetAppPath();
    const setShowClicked = useSetRecoilState(getStateAtom('showClicked', false));

    const scrollerCoords = useRecoilValue(getStateAtom('scroller-coords', null));
    const setScrollHeight = useSetRecoilState(getStateAtom('scroll-height', 0));
    const stpe = useQueryValue("stpe", null);

    useEffect(() => {
        if ( stpe ) {
            const { y } = flexRef.current.getBoundingClientRect();
            const relY = y - scrollerCoords.y;
            console.log("Setting scroll height: " + relY);
            setScrollHeight(relY);
        }
        // eslint-disable-next-line
    }, [stpe]);

    const slideDown = () => {
        const node = flexRef.current;
        if ( expandFromClick ) {
            node.style.transition = 'height 500ms';
            resetExpandFromClick();
        }
        node.style.height = node.scrollHeight + "px";
    };

    useImperativeHandle(ref, () => ({
        slideUp() {
            const node = flexRef.current;
            node.style.transition = 'height 500ms';
            node.style.height = "0px";
            setTimeout(() => node.style.transition = '', 500);
        }
    }));

    useEffect(() => {
        slideDown();
        Jdenticon();
        // eslint-disable-next-line
    }, []);

    return (
        <div ref={flexRef} className="flex">
            <IcoX style={ closeIcoStyle } onClick={ (e) => { toggleExpand(e) } } />
            
            { (user.is_admin || user.email.trim().toLowerCase() === node.created_by.trim().toLowerCase()) ? <Button
                className='edit-project node-action'
                variant="contained" color="primary"
                onClick={() => setAppPath(`/goals/${node.id}/edit`, true)}
            >Edit</Button> : "" }


            <h3 className='node-name'>{node.research_goal} <div className='node-type' ><span>Disease Indication:</span> {node.disease_indication}</div></h3>
            
            <div className='flex-container' style={{'borderBottom': '#e8e8e8 1px solid', paddingBottom: '15px', marginBottom: '15px'}}>
                <div className='flex-col'>
                    <canvas className="node-icon" width="150" height="150" data-jdenticon-value={node.id}></canvas>
                </div>
                <div className='flex-col flex-col-descript'>
                    <div className='node-description'>
                        <strong>Description:</strong> {node.goal_description}
                    </div>
                </div>
                <div className='flex-col flex-col-stats'>
                    <table className='node-info'>
                        <tbody>
                            <tr>
                                <td>
                                    <p className="node-info-field">Asset Information</p>
                                    {node.asset_information}
                                </td>
                                <td>
                                    <p className="node-info-field">Research Team</p>
                                    {node.reasearch_team || "No Data"}
                                </td>
                                <td>
                                    <p className="node-info-field">Reasearch Goal PI</p>
                                    {node.reasearch_goal_pi}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="node-info-field">Disease Indicaton</p>
                                    {node.disease_indicaton || "No Data"}
                                </td>
                                <td>
                                    <p className="node-info-field">Asset Information</p>
                                    {node.asset_information || "No Data"}
                                </td>
                                <td>
                                    <p className="node-info-field">Created By</p>
                                    {node.created_by}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='flex-container'>
                <div className='flex-col'>
                    <h2 className='associated-title'>Sub Goals</h2>
                    {node.childgoals && node.childgoals.length > 0 ? node.childgoals.map((n) => <Chip
                        icon={<AccountTreeIcon />}
                        key={n.id}
                        label={n.research_goal}
                        clickable
                        color="primary"
                        variant="outlined"
                        style={{marginRight:'10px'}}
                        onClick={() => {
                            setShowClicked(true);
                            setAppPath("/goals", false, {
                                show: n.id
                            });
                        }}
                        />)
                     : "None"}
                </div>
                <div className='flex-col' style={{flex:1,marginLeft:'15px'}}>
                    <h2 className='associated-title'>Analyses</h2>
                    {node.analyses && node.analyses.length > 0 ? node.analyses.map((p) => 
                        <Chip
                        key={p.id}
                        icon={<MultilineChartIcon />}
                        label={p.analysis_name}
                        clickable
                        color="primary"
                        variant="outlined"
                        style={{marginRight:'10px'}}
                        onClick={() => {
                            setShowClicked(true);
                            setAppPath("/analyses", false, {
                                show: p.id
                            });
                        }}
                        />
                    ) : "None"}
                </div>
                <div className='flex-col' style={{flex:1,marginLeft:'15px'}}>
                    <h2 className='associated-title'>Studies</h2>
                    {node.studies && node.studies.length > 0 ? node.studies.map((p) => 
                        <Chip
                        key={p.id}
                        icon={<SearchIcon />}
                        label={p.study_name}
                        clickable
                        color="primary"
                        variant="outlined"
                        style={{marginRight:'10px'}}
                        onClick={() => {
                            setShowClicked(true);
                            setAppPath("/studies", false, {
                                show: p.id
                            });
                        }}
                        />
                    ) : "None"}
                </div>
                <div className='flex-col' style={{flex:1,marginLeft:'15px'}}>
                    <h2 className='associated-title'>Cohorts</h2>
                    {node.cohorts && node.cohorts.length > 0 ? node.cohorts.map((p) => 
                        <Chip
                        key={p.id}
                        icon={<GroupIcon />}
                        label={p.cohort_name}
                        clickable
                        color="primary"
                        variant="outlined"
                        style={{marginRight:'10px'}}
                        onClick={() => {
                            setShowClicked(true);
                            setAppPath("/cohorts", false, {
                                show: p.id
                            });
                        }}
                        />
                    ) : "None"}
                </div>
                <div className='flex-col' style={{flex:1,marginLeft:'15px'}}>
                    <h2 className='associated-title'>Datasets</h2>
                    {node.datasets && node.datasets.length > 0 ? node.datasets.map((p) => 
                        <Chip
                        key={p.id}
                        icon={<StorageIcon />}
                        label={p.dataset_name}
                        clickable
                        color="primary"
                        variant="outlined"
                        style={{marginRight:'10px'}}
                        onClick={() => {
                            setShowClicked(true);
                            setAppPath("/datasets", false, {
                                show: p.id
                            });
                        }}
                        />
                    ) : "None"}
                </div>
            </div>
            
            <div style={{clear: 'both'}}></div>
        </div>
    );
});


const GoalTableRow = (props) => {
    return <NodeTableRow flex={Flex} renderRow={(node) => {
        return <>
            <td>{node.research_goal}</td>
            <td style={{maxWidth: '600px'}}>{node.asset_information}</td>
            <td>{node.disease_indication}</td>
            <td>{node.reasearch_goal_pi}</td>
            <td>{node.reasearch_team || "No Data"}</td>
        </>;
    }} {...props} />;
};


export default GoalTableRow;
