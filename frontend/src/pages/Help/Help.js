import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Data } from './Data';
import { Data2 } from './Data2';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import ReactPlayer from "react-player";


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }));

  
  
export default function Help(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <div className="w-full h-screen bg-white dark:bg-gray-900">
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
            
              value={value}
              onChange={handleChange}
              className="dark:bg-gray-800"
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              centered
            >
              <Tab label={<span style={{ color: props.darkmode?'#111827':'#F3F4F6' }}>FAQs</span>} {...a11yProps(0)} />
              <Tab label={<span style={{ color: props.darkmode?'#111827':'#F3F4F6' }}>Tutorial</span>}  {...a11yProps(1)} />
             {/* <Tab label="Email" {...a11yProps(2)} />*/}
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0} class="dark:bg-gray-900">

          <div>
      <section class="text-gray-700">
        <div class="container px-5 py-24 mx-auto dark:bg-gray-900">
          <div class="text-center mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-800 mb-4 dark:text-gray-100">
              Frequently Asked Question
            </h1>
            <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto dark:text-gray-200">
              The most common questions about how SoftArc works and what
              can we do for you.
            </p>
          </div>
          <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            <div class="w-full lg:w-1/2 px-4 py-2">

              {Data.map((item, index) => {
            return (
              <details class="mb-4">
              <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                  {item.question}
                </summary>

                <span class="dark:text-gray-200">
                  {item.answer}
                </span>
                </details>
             ) }
          )}

                
              
            </div>
            <div class="w-full lg:w-1/2 px-4 py-2">
            {Data2.map((item, index) => {
            return (
              <details class="mb-4">
              <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                  {item.question}
                </summary>

                <span class="dark:text-gray-200">
                  {item.answer}
                </span>
                </details>
             ) }
          )}
            </div>
          </div>
        </div>
      </section>
    </div>
                
          
          </TabPanel>

          <TabPanel value={value} index={1} class="dark:bg-gray-900">
            
            
          <div className="w-11/12 mx-auto ">
          <div class="text-center mb-4">          
    <p class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4 dark:text-gray-100">
              A video tutorial on How to use SoftArc
            </p>
            </div>
        
<div class="aspect-w-16 aspect-h-9">
  <iframe src="https://player.vimeo.com/video/146022717?color=0c88dd&title=0&byline=0&portrait=0&badge=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>
 
        </div>
            
      
      
          </TabPanel>
          <TabPanel value={value} index={2}>
            Send Email
          </TabPanel>
          
        </div>
        </div>
      );

 

        }       
