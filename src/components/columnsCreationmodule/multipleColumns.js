import React,{Component} from 'react';
import { Link } from "react-router-dom";

import Column from './column';
import './column.css';
import TableData from '../tableEntrymodule/tableEntry';

import Tooltip from '@material-ui/core/Tooltip';
import { Paper } from '@material-ui/core';

export default class MultipleColumn extends Component {
    constructor(props)  {
        super(props);
        this.state={
            columns: 1,
            columnsData: [],
            submitted: false,
            errorMessage: '',
        }
    }

    handleAddColumn = () => {
        this.setState((prevState, props) => {
          return { columns: prevState.columns + 1 };
        });
      };
    
      handleAddColumnData = columnData => {
        var newcolumnsData = this.state.columnsData.slice();
        newcolumnsData.push(columnData);
        this.setState({ columnsData: newcolumnsData });
      };
    
      handleRemoveColumnData = indexToRemove => {
        if(indexToRemove === 1) {
        
        }
        else {
            this.setState((prevState, props) => {
                return { columns: prevState.columns - 1 };
            });
            this.setState({
                columnsData: this.state.columnsData.filter(
                    (_, i) => i !== indexToRemove - 1
                )
            });
        }
      };
    
      handleSubmit = () => {
        if(this.state.columnsData.length > 0) {
            this.setState({ submitted: true, errorMessage: "" });
        }
        else {
            this.setState({
                errorMessage: 'Please enter the fields'
            });
        }
      };
    

      renderColumnForms = () => {
        let columnForm = [];
        for (let j = 1; j <= this.state.columns; j++) {
          columnForm.push(
            <Column
              onAddColumnData={this.handleAddColumnData}
              onRemoveColumnData={this.handleRemoveColumnData}
              columnNumber={j}
              key={j}
              error={this.state.errorMessage}
            />
          );
        }
    
        return columnForm;
      };

    render() {
        return(
            <Paper id="main-paper">
                <div>
                    <h1 className="heading">Create Columns</h1>
                </div>
                {this.renderColumnForms()}
                <Tooltip title="Add Column">
                    <button
                        type="button"
                        onClick={this.handleAddColumn}
                        className="multiButton"
                        style={{backgroundColor: 'blueviolet', color: 'white'}}
                    >
                        Add Column (+)
                    </button>
                </Tooltip>
                <Tooltip title="Submit Columns">
                    <button
                        type="button"
                        onClick={this.handleSubmit}
                        className="multiButton"
                        style={{backgroundColor: '#246f45', color: 'white'}}
                    >
                        Submit Columns
                    </button>
                </Tooltip>
                {this.state.submitted && (
                    <Link
                        to={{
                            pathname: "/entry-table",
                            state: { array: this.state.columnsData },
                            component: TableData,
                        }}
                    >   
                        <Tooltip title="Go to Table entry">
                            <button type="button" className="multiButton" style={{backgroundColor: "#114a2db0", color: 'white'}}>
                                Go to Table entry 
                            </button>
                        </Tooltip>
                    </Link>    
                )}
            </Paper>
        )
    }
}
