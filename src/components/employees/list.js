import React, {Component, Fragment} from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableSortLabel
} from '@material-ui/core';
import Pagination from 'material-ui-pagination';

export default class ListComponent extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    this.setTotal = this
      .setTotal
      .bind(this);
    this.setDisplay = this
      .setDisplay
      .bind(this);
    this.state = {
      total: 20,
      display: 7,
      number: 7
    };
  }
  setTotal(event, total) {
    // eslint-disable-next-line no-param-reassign
    total = total.trim();
    if (total.match(/^\d*$/)) {
      if (total !== '') {
        // eslint-disable-next-line no-param-reassign
        total = parseInt(total, 10);
      } else {
        // eslint-disable-next-line no-param-reassign
        total = 0;
      }

      this.setState({total});
    }
  }

  setDisplay(event, display) {
    // eslint-disable-next-line no-param-reassign
    display = display.trim();
    if (display.match(/^\d*$/)) {
      if (display !== '') {
        // eslint-disable-next-line no-param-reassign
        display = parseInt(display, 10);
      } else {
        // eslint-disable-next-line no-param-reassign
        display = 0;
      }

      this.setState({display});
    }
  }
  render() {
    return (
      <Fragment>
        <Table className="listTable">
          <TableHead>
            <TableRow>
              {this
                .props
                .header
                .map((n, i) => {
                  return (
                    <TableCell key={i}>{n}</TableCell>
                  )
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {this
              .props
              .data
              .map((n, i) => {
                return (
                  <TableRow key={`dataRow_${i}`}>
                    {this
                      .props
                      .header
                      .map((k, l) => {
                        return (
                          <TableCell key={`rowColumn_${l}`}>{n[k]}</TableCell>
                        )
                      })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
        </Fragment>
    );
  }
}