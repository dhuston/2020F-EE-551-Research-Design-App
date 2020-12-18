import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { DropDown, SuggestBox, MultiSuggestBox } from '../controls/DropDown';
import Popup from '../popup/Popup';
import axios from 'axios';
import config from '../config';
import './GoalCreatePopup.css';
import { getStateAtom } from '../state/make';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useSetAppPath } from '../hooks/urlState';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import { cleanNodeRelationships, relationshipDynamic, ldapDynamic } from '../helpers';

const GoalCreatePopup = (props) => {

  const user = useRecoilValue(getStateAtom('userState', null));

  const setAppPath = useSetAppPath();

  const isEditMode = (typeof props.node !== "undefined");
  const wizardCurrentStep = props.stepIndex;
  const linkInfo = useRecoilValue(getStateAtom(props.apiName + '-link-info', null));

  const [error_message, setError_message] = useState('');
  const [goalSchema, setGoalSchema] = useState(null);
  
  const blankForm = Object.freeze({
    type: props.apiName,

    // System
    created_by: user.email, // FIX ME, can be forged

    // Required
    research_goal: "",
    reasearch_goal_pi: "",
    goal_description: "",

    asset_information: "",
    disease_indication: "",

    parentgoals: []
  });

  const [formData, updateFormData] = useRecoilState(getStateAtom('createGoalPopupFrom', blankForm));

  const closePopup = () => {
    setAppPath(props.appPath, true);
    
    // Clear out global recoil state cache if we close the edit form
    // To prevent new goal form from being populated
    if ( isEditMode ) {
      updateFormData(blankForm);
    }
  };

  // Load goal schema
  useEffect(() => { 
    // Update goal form state from props
    if ( isEditMode ) {
      updateFormData({
        ...props.node
      });
    }
    axios.get(config.apiEndpoint + '/api/' + props.apiName + '/schema?extended=1', {withCredentials: true})
    .then((resp) => { 
      setGoalSchema(resp.data.schema.properties);
    }) 
    .catch((error) => { 
      console.log(error)
    });
  }, [isEditMode, props.node, props.apiName, updateFormData]);


  const createGoal = () => {
    const newGoal = {
      ...formData,
      created_datetime: new Date().toDateString()
    };

    if ( newGoal['parentgoals'] ) newGoal['parentgoals'] = newGoal['parentgoals'].map((s) => { return {id: s.id}; });

    if ( isEditMode ) {
      newGoal[props.nodeIdentifier] = props.node[props.nodeIdentifier];
    }

    var createCall;
    var createEndpoint;
    if ( isEditMode ) {
      createCall = axios.put;
      createEndpoint = config.apiEndpoint + '/api/' + props.apiName + '/' + props.node.id;
      cleanNodeRelationships(newGoal, linkInfo);
    } else {
      createCall = axios.post;
      createEndpoint = config.apiEndpoint + '/api/' + props.apiName;
    }

    createCall(createEndpoint, newGoal, {withCredentials: true})
    .then((resp) => { 
      newGoal.id = resp.data.id;
      props.create(newGoal);
      updateFormData(blankForm);
    }) 
    .catch((error) => { 
      const renderErr = error.response.data.errors ? error.response.data.errors : [error.response.data.message];
      setError_message(renderErr);
    });
  }

  const wizardNext = () => {
    const step = ( wizardCurrentStep === (wizardSteps.length - 1) ) ? 0 : wizardCurrentStep + 1;

    if ( isEditMode ) { 
      setAppPath(`${props.appPath}/${props.node[props.nodeIdentifier]}/edit/${step}`, true);
    } else {
      setAppPath(`${props.appPath}/new/${step}`, true);
    }
  };

  const wizardPrevious = () => {
    const step = ( wizardCurrentStep === 0 ) ? wizardSteps.length - 1 : wizardCurrentStep - 1;

    if ( isEditMode ) {
      setAppPath(`${props.appPath}/${props.node[props.nodeIdentifier]}/edit/${step}`, true);
    } else {
      setAppPath(`${props.appPath}/new/${step}`, true);
    }
  };

  if ( goalSchema == null ) return null;

  const fieldChange = fieldName => (e, val) => {
    const updateVal = e.target.value ? e.target.value : val;
    updateFormData({
      ...formData,
      [fieldName]: updateVal
    });
  };

  const wizardSteps = [
    (
      <div key='wizard-step-1' className="wizard-step-1">
        <table className='create-goal-tbl'>
        <tbody>
          <tr>
            <td colSpan="3">
              <Tooltip placement="top" title={goalSchema.research_goal.description}>
                <TextField style={{width: '100%'}} onChange={fieldChange('research_goal')} value={formData['research_goal']} label="Research Goal"  />
              </Tooltip>
            </td>
          </tr>
          <tr>
            <td>
              <Tooltip placement="top" title={goalSchema.asset_information.description}>
                <div>
                  <DropDown
                    label='Asset Information'
                    selected={ formData['asset_information'] }
                    options={ goalSchema.asset_information.enum }
                    onChange={ fieldChange('asset_information') }
                  />
                </div>
              </Tooltip>
            </td>
            <td>
              <Tooltip placement="top" title={goalSchema.reasearch_team.description}>
                <div>
                  <SuggestBox
                    label='Research Team'
                    selected={ formData['reasearch_team'] }
                    suggestDynamicList={ ldapDynamic('reasearch_team', props.apiName) }
                    onChange={ fieldChange('reasearch_team') }
                  /> 
                </div>
              </Tooltip>
            </td>
            <td>
              <Tooltip placement="top" title={goalSchema.reasearch_goal_pi.description}>
                <div>
                  <SuggestBox
                    label='Research Goal PI'
                    selected={ formData['reasearch_goal_pi'] }
                    suggestDynamicList={ ldapDynamic('reasearch_goal_pi', props.apiName) }
                    onChange={ fieldChange('reasearch_goal_pi') }
                  />
                </div>
              </Tooltip>
            </td>
          </tr>
          <tr>
            <td colSpan="3">
              <Tooltip placement="top" title={goalSchema.research_goal.description}>
                <div>
                  <TextField
                    label="Goal Description"
                    multiline
                    rows={4}
                    defaultValue={formData['goal_description']}
                    variant="outlined"
                    style={{width:'100%'}}
                    onChange={fieldChange('goal_description')}
                  />
                </div>
              </Tooltip>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    ),
    (
      <div key='wizard-step-2' className="wizard-step-2">

        <table className='create-goal-tbl'>
        <tbody>
          <tr>
            <td>            
              <Tooltip placement="top" title={goalSchema.disease_indication.description}>
                <TextField style={{width: '100%'}} onChange={fieldChange('disease_indication')} value={formData['disease_indication']} label="Disease Indication"  />
              </Tooltip>
            </td>
            <td>
            <Tooltip placement="top" title="Goal">
                <div>
                  <MultiSuggestBox
                    label='Goal'
                    selected={ formData['parentgoals'] }
                    displayField='research_goal'
                    suggestDynamicList={ relationshipDynamic('goal') }
                    onChange={ fieldChange('parentgoals') }
                  />
                </div>
              </Tooltip>
            </td>
          </tr>
          </tbody>
        </table>

      </div>
    )
  ];

  const wizardNumSteps = wizardSteps.length;

  return (
    <Popup
    iconName={props.iconName}
    title={props.title}
    close={closePopup}
    >
      { wizardSteps[wizardCurrentStep] }

      { error_message ? <div className="error-msg"><strong>Error creating goal:</strong> { error_message.map((e) => <div>- {e}</div>) }</div> : "" }

      { wizardCurrentStep !== 0 &&
      <Button
        className='wizard-previous'
        variant="contained"
        onClick={wizardPrevious}
      >Previous</Button> }

      { wizardCurrentStep !== wizardNumSteps - 1 &&
      <Button
        className='wizard-next'
        variant="contained"
        onClick={wizardNext}
      >Next</Button> }

      { wizardCurrentStep === (wizardNumSteps - 1) && (<Button
        className='create-goal-btn-pop'
        variant="contained" color="primary"
        onClick={createGoal}
        style={{float:'right'}}
      >{isEditMode ? 'Save Goal' : 'Enroll New Goal'}</Button>) }

      <div style={{clear: 'right'}}></div>
    </Popup>
  );
  
}

export default GoalCreatePopup;