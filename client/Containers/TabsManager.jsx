import React, { useState } from 'react';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import QueriesContainer from './QueriesContainer';
import DeleteButton from '../Components/MiniComponents/TabsDeleteButton';

import * as types from '../Constants/actionTypes';

import { useStateValue } from '../Context';


import 'react-tabs/style/react-tabs.css';

const TabsManager = () => {
  // rendering tabs inside render method, based on tabsListLabels, just nums in an array

  const [state, dispatch] = useStateValue();

  const [queriesTabs, setQueriesTabs] = useState({
    tabsListLabels: [0],
  });
  const [currentTab, setCurrentTab] = useState({ tabIndex: 0 });

  const deleteTab = (tabId) => {
    // delete tabs by checking tabId, which is passed as a prop upon creation of tab
    // let tabIdx;
    setQueriesTabs({
      tabsListLabels: queriesTabs.tabsListLabels.filter((el, idx) => el !== tabId),
      // if (el === tabId) tabIdx = idx;
    });

    // dispatch({
    //   type: types.DELETE_TAB_STATE,
    //   deletedTab: tabId,
    // });

    // change tab if current tab was deleted tab not working
    // if (currentTab.tabIndex === tabIdx) setCurrentTab({ tabIndex: tabIdx - 2 });
  };

  const addNewTab = () => {
    // push new item (just a num) to tabsListLabels
    const newTabsListLabels = queriesTabs.tabsListLabels.slice(0);

    // adds +1 to whateve the final item is in the list
    const newLabel = newTabsListLabels[newTabsListLabels.length - 1] + 1;
    newTabsListLabels.push(newLabel);

    setQueriesTabs({
      tabsListLabels: newTabsListLabels,
    });
    // dispatch({
    //   type: types.SET_NEW_TAB_STATE,
    //   newTabIndex: newLabel,
    // });
  };

  console.log('new state labels: ', queriesTabs.tabsListLabels);
  return (
    <Tabs
      forceRenderTabPanel
      selectedIndex={currentTab.tabIndex}
      onSelect={(tabIndex, lastIndex, event) => {
        console.log('event objec: ', event.target.getAttribute('tab-id'));
        // this is confusing, but these indecies DO line up with indecies in current state
        console.log('last tab: ', lastIndex);
        console.log('new tab: ', tabIndex);
        const tabIdToSave = queriesTabs.tabsListLabels[lastIndex];
        console.log(tabIdToSave);
        setCurrentTab({ tabIndex });
      }}
    >
      <TabList id="tabs-list">
        {queriesTabs.tabsListLabels.map((el, idx) => (idx !== 0
          ? (
            <Tab key={`tab-${el}`} tab-id={el}>
              {`Title ${el}`}
              <DeleteButton key={`del-btn-${el}`} tabId={el} deleteTab={deleteTab} />
            </Tab>
          )
          : (
            <Tab key={`tab-${el}`} tab-id={el}>
              {`Title ${el}`}
            </Tab>
          )))}
        {/* {<button type="button" onClick={deleteTab}>x</button>} */}
        <button type="button" id="add-tab-button" style={{ fontSize: '25px' }} onClick={addNewTab}>+</button>
      </TabList>
      {/* {queriesTabs.queriesContainers} */}
      {queriesTabs.tabsListLabels.map((el, idx) => <TabPanel id="tab-panel" key={`tab-panel-${el}`} tab-panel-id={el}><QueriesContainer stateTabReference={el} key={`qc-${el}`} /></TabPanel>)}
    </Tabs>
  );
};

export default TabsManager;
