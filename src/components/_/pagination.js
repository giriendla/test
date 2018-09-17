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
import Pagination from 'rc-pagination';

export default class ListComponent extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    this.state = {
      pgCurrent: 1,
      pgPerPage: 2
    };
    const totalData = [];

    this.onPaginationChange = this
      .onPaginationChange
      .bind(this);
  }
  onPaginationChange = (page) => {
    console.log(page);
    this.setState({pgCurrent: page});
  }
  doPaginate(data) {
    /* this.setState({...this.state, pgData: {data: data}}); */
    this.totalData = data;
  }
  showTotalRows = (data, arr) => {
    let actualData = [];
    for (let i = arr[0]; i <= arr[1]; i++) {
      let row = this.props.data[i - 1];
      actualData.push(row);
    }
    this.totalData = actualData;
    // this.doPaginate(actualData);
    console.log("Show Total Rows", data, arr);
  }
  showPaginate() {
    let array = this.props.data;
    let page_number = this.state.pgCurrent;
    let page_size = this.state.pgPerPage;
    --page_number; // because pages logically start with 1, but technically with 0
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
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
            <RenderPageItems data={this.showPaginate()} header={this.props.header}/>
          </TableBody>
        </Table>
        <Pagination
          defaultCurrent={1}
          onChange={this.onPaginationChange}
          current={this.state.pgCurrent}
          total={this.props.data.length}
          pageSize={this.state.pgPerPage}/>
      </Fragment>
    );
  }
}

const RenderPageItems = (props) => {
  const data = props;
  const doPaginate = (props) => {
    console.log("At Render Page Items", props);
  }

  doPaginate(props);
  const rowsRender = () => {
    console.log("All Props at child", props);
    if (props.data.length > 0) {
      return (
        <Fragment>
          {props
            .data
            .map((n, i) => {
              console.log(n)
              return (
                <TableRow key={i}>
                  {props.header.map((k, l) => {
                    return (
                      <TableCell key={l}>{n[k]}</TableCell>
                    )
                  })}
                </TableRow>
              )
            })
}

        </Fragment>
      )
    } else {
      return (
        <TableRow>
          <TableCell>{props.data.length}</TableCell>
          <TableCell>5</TableCell>
          <TableCell>6</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      )
    }
  }

  return (
    <Fragment>
      {rowsRender(props)}
    </Fragment>
  )
}