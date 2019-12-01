import React,{Component} from "react";

import ReactDataGrid from "react-data-grid";
import { Editors } from "react-data-grid-addons";
import { Link } from "react-router-dom";

import DateEditor from "./dateEditor";
import NumberEditor from "./numberEditor";
import "./tableEntry.css";
import TableViewData from '../tableView/tableView';

import { Paper } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';

const { DropDownEditor } = Editors;

export default class TableEntry extends Component {

  returnSingleObject = j => {
    let obj = {};
    this.props.location.state.array.map(columnData => {
    //   if (this.state.rows.length === 0)
    //     obj[columnData.columnName] = "";
    //   else
    //     obj[columnData.columnName] = this.state.rowData[j][
    //       columnData.columnName
    //     ];
    });
    return obj;
  };

  state = {
    rows: [
      this.returnSingleObject(0),
      this.returnSingleObject(1),
      this.returnSingleObject(2),
      this.returnSingleObject(3),
      this.returnSingleObject(4),
      this.returnSingleObject(5),
      this.returnSingleObject(6),
      this.returnSingleObject(7),
      this.returnSingleObject(8),
      this.returnSingleObject(9),
      this.returnSingleObject(10),
      this.returnSingleObject(11),
      this.returnSingleObject(12),
      this.returnSingleObject(13),
      this.returnSingleObject(14),
      this.returnSingleObject(15),
      this.returnSingleObject(16),
      this.returnSingleObject(17),
      this.returnSingleObject(18),
      this.returnSingleObject(19)
    ],
    rowData: [],
  };

  handleBack = () => {
      this.props.history.replace("/");
  }

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
       state.rowData=rows;
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  handleSubmit = () => {
    this.setState({
        rowData: this.state.rows
    });
  };


  render() {
    const columns = this.props.location.state.array.map((columnData, index) => {
      if (columnData.columnType === "Multiselect") {
        const options = columnData.multiSelectValues.split(" ").map(option => {
          return { id: option, value: option };
        });
        return {
          key: columnData.columnName.replace(" ", ""),
          name: `${columnData.columnName} (${columnData.columnType})`,
          editable: true,
          editor: <DropDownEditor options={options} />
        };
      }
      if (columnData.columnType === "Number") {
        return {
          key: columnData.columnName.replace(" ", ""),
          name: `${columnData.columnName} (${columnData.columnType})`,
          editable: true,
          editor: NumberEditor
        };
      }
      if (columnData.columnType === "Date") {
        return {
          key: columnData.columnName.replace(" ", ""),
          name: `${columnData.columnName} (${columnData.columnType})`,
          editable: true,
          editor: DateEditor
        };
      }
    });

    return (
        <Paper id="table-paper">
            <h1 style={{color: 'blue', textAlign: 'center'}}>Table-Entry</h1>
            <ReactDataGrid
                columns={columns}
                rowGetter={i => this.state.rows[i]}
                rowsCount={20}
                onGridRowsUpdated={this.onGridRowsUpdated}
                enableCellSelect={true}
                minHeight={800}
            />
            <div>
                {this.state.rowData.length > 0 &&
                    <Link
                        to={{
                            pathname: "/table-view",
                            state: { tableData: this.props.location.state.array, viewData: this.state.rowData },
                            component: TableViewData,
                        }}
                    >
                        <Tooltip title="View Table">
                            <button
                                type="button"
                                className="table-button"
                                style={{backgroundColor: 'darkgreen', color: 'white'}}
                            >
                                View Table
                            </button>
                        </Tooltip>
                    </Link>  
                }
                <Tooltip title="Previous Page">
                    <button
                        type="button"
                        className="table-button"
                        onClick={this.handleSubmit}
                        style={{backgroundColor: 'rgb(45, 60, 86)', color: 'white'}}
                    >
                        Submit data
                    </button>
                </Tooltip>
                <Tooltip title="Previous Page">
                    <button
                        type="button"
                        className="table-button"
                        onClick={this.handleBack}
                        style={{backgroundColor: '#124092', color: 'white'}}
                    >
                        Previous page
                    </button>
                </Tooltip>
            </div>
        </Paper>
    );
  }
}

