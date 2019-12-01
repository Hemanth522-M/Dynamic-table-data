import React, {Component} from 'react';

import Tooltip from '@material-ui/core/Tooltip';

import './column.css';

export default class Column1 extends Component{
    constructor(props){
        super(props);
        this.state ={
            columnName: '',
            columnType: '',
            multiSelectValues:'',
            addColumn: false,
            errorcolumnName:'',
            errorcolumnType: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            errorcolumnName: '',
            errorcolumnType: '',
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        //const { columnName, columnType, multiSelectValues } = this.state;

        const { addColumn, ...stateWithoutAdded } = this.state;
        this.props.onAddColumnData({
            ...stateWithoutAdded
        });
        if(this.state.columnName === "") {
            this.setState({
                errorcolumnName: 'Please enter the column name',
            });
        }
        else if(this.state.columnType === "") {
            this.setState({
                errorcolumnType: 'Please select the column type',
            })
        }
        else {
            this.setState({
               addColumn: true
            })
        }  
    };
    
    handleRemoveColumn = () => {
        this.props.onRemoveColumnData(this.props.columnNumber);
    };

    render(){
        return(
            <div id="column">
                <div className="inner-paper">
                    <h2 style={{color: 'red'}}>{this.props.error}</h2>
                    <h2>Column No&nbsp;{this.props.columnNumber}</h2>
                    <span className="names">Column Name&nbsp;:</span>&nbsp;
                    <input type="text" value={this.state.columnName} className="input"
                        onChange={this.handleChange} name="columnName" placeholder="Enter column name" />
                    {this.state.errorcolumnName &&
                        <div>
                            <span className="error">{this.state.errorcolumnName}</span>
                        </div>
                    }
                </div>
                <div className="inner-paper">
                    <span className="names">Column Type&nbsp;&nbsp;:</span>&nbsp;&nbsp;
                    <select
                        name="columnType"
                        value={this.state.columnType}
                        onChange={this.handleChange}
                        className="select"
                    >   
                        <option>Select column types</option>
                        <option>Date</option>
                        <option>Number</option>
                        <option>Multiselect</option>
                    </select>
                    {this.state.errorcolumnType &&
                        <div>
                            <span className="error">{this.state.errorcolumnType}</span>
                        </div>
                    }
                </div>
                {this.state.columnType ===  "Multiselect" && (
                    <div className="inner-paper">
                        <span className="names">Multi-Values&nbsp;&nbsp;:</span>&nbsp;&nbsp;&nbsp;
                        <input type="text" name="multiSelectValues" placeholder="Enter list of values seperated by commas"
                            onChange={this.handleChange} className="multi-values" />
                    </div>
                )}
                <div>
                    <Tooltip title="Remove this column">
                        <button type="button" className="button" onClick={this.handleRemoveColumn} style={{backgroundColor: 'brown', color: 'white'}}>Remove this column</button>
                    </Tooltip>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {this.state.addColumn ? 
                        <button type="submit" style={{backgroundColor: "chocolate", color: 'white'}} disabled={this.state.addColumn} onClick={this.handleSubmit} className="button">
                            Added
                        </button> 
                        :
                        <Tooltip title="Add this column">
                            <button type="submit" style={{backgroundColor: "chocolate", color: 'white'}} disabled={this.state.addColumn} onClick={this.handleSubmit} className="button">
                                Add this column
                            </button>
                        </Tooltip>
                    }
                </div>
            </div>
        )
    }
}