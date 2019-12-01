import React,{Component} from "react";

import ReactDataGrid from "react-data-grid";
import { Link } from "react-router-dom";

import TableEntry from '../tableEntrymodule/tableEntry';
import "./tableView.css";

import Tooltip from '@material-ui/core/Tooltip';

export default class TableView extends Component {
  state = { rows: this.props.location.state.viewData};

  handleBack = () => {
    
    window.location.assign("/");
  };

  render() {
    const columns = this.props.location.state.tableData.map((columnData, index) => {
      return {
        key: columnData.columnName.replace(" ", ""),
        name: `${columnData.columnName} (${columnData.columnType})`,
        editable: false
      };
    });

    return (
      <div>
        <h1 style={{color: 'green', textAlign: 'center'}}>Table-View</h1>
        <ReactDataGrid
          columns={columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={20}
          enableCellSelect={true}
          minHeight={800}
        />
        <div>
            <Tooltip title="Main Page">
                <button
                    type="button"
                    className="table-view-button"
                    onClick={this.handleBack}
                    style={{backgroundColor: '#817c86', color: '#ffffff'}}
                >
                    Main Page
                </button>
            </Tooltip>
            <Link
                to={{
                    pathname: "/entry-table",
                    state: { array: this.props.location.state.tableData, data: this.props.location.state.viewData},                    
                    component: TableEntry,
                }}
            >   
                <Tooltip title="Go back to Table entry">
                    <button
                        type="button"
                        className="table-view-button"
                        style={{backgroundColor: 'rgb(52, 95, 138)', color: 'white'}}
                    >
                        Go back to Table entry
                    </button>
                </Tooltip>
            </Link>   
        </div>
      </div>
    );
  }
}
