import React from 'react';
import GoalTableRow from './GoalTableRow';
import goalListAtoms from '../state/GoalList';
import GoalCreatePopup from './GoalCreatePopup'
import NodeTableList from '../nodeTable/NodeTableList';

export default () => {
    return <NodeTableList
        stateAtoms={goalListAtoms}
        appPath="/goals"
        apiName="goal"
        join={[[{
            node: 'goal',
        }],[{
            node: 'analysis',
        }],[{
            node: 'study',
        }],[{
            node: 'cohort',
        }],[{
            node: 'dataset',
        }]]}
        singular="Goal"
        displayField="research_goal"
        trComp={GoalTableRow}
        createPopupComp={GoalCreatePopup}
        plural="Goals"
        defaultSortField="research_goal"
        nodeIdentifier="id"
        tableFields = {{
            "research_goal": "Research Goal",
            "asset_information": "Asset Information",
            "disease_indication": "Disease Indication",
            "reasearch_goal_pi": "Research Goal PI",
            "reasearch_team": "Research Team",
        }}
        searchFields={[
            "research_goal",
            "asset_information",
            "disease_indication",
            "reasearch_goal_pi",
            "reasearch_team"
        ]}
    />;
};