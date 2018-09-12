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

export default class ListComponent extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
  }
  render() {
    return (
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
    );
  }
}